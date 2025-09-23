import SQLite,{SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'customer.sqlite';


export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabase(
      { name: 'customer.sqlite', createFromLocation: '~customer.sqlite' },
      () => console.log(' DB opened'),
      (error) => console.error(' DB open error:', error)
    );

    db.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table"',
        [],
        (_, result) => {
          const tables = result.rows.raw();
          console.log(' Tables in DB:', tables);
        },
        (_, error) => {
          console.error(' Error checking tables:', error);
          return false;
        }
      );
    });

    return db;
  } catch (err) {
    console.error(' getDBConnection failed:', err);
    throw err;
  }
};

export const getCustomer= async( db: SQLiteDatabase ): Promise<any> => {
    try{
        const placeData : any = [];
        const query = `SELECT * FROM customer ORDER BY name`;
        const results = await db.executeSql(query);
        results.forEach(result => {
          (result.rows.raw()).forEach(( item:any ) => {
              placeData.push(item);
          })
        });
        return placeData;
      } catch (error) {
        console.error(error);
        throw Error('Failed to get customer !!!');
      }
}

interface Customer {
  email: string;
  password: string;
  name: string;
  gender: string;
  phoneNumber: number;
  birthday: string;
}

export const getCustomerByEmail = async (
  db: SQLite.SQLiteDatabase,
  email: string
): Promise<Customer | null> => {
  try {
    const query = `SELECT * FROM customer WHERE email = ?`;
    const results = await db.executeSql(query, [email]);
    console.log('Raw SQL results:', JSON.stringify(results));
    const resultSet = results[0]; // always at index 0
    const rows = resultSet.rows;

    if (rows.length === 0) {
      console.log('No customer found with email:', email);
      return null;
    }

    const customer = rows.item(0) as Customer;
    console.log('Customer found:', customer);
    return customer;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch customer');
  }
};


export const createCustomer = async( 
        db: SQLiteDatabase,
        email:string,
        password:string,
        name: string,
        gender : string,
        phoneNumber : number,
        birthday:string,
    ):Promise<void> => {
    try{
      const existingCustomer = await getCustomerByEmail(db, email);
    if (existingCustomer) {
      throw new Error('Email already registered');
    }
        const query = 'INSERT INTO customer(email,password,name,gender,phoneNumber,birthday) VALUES(?,?,?,?,?,?)';
        const parameters = [email,password,name,gender,phoneNumber,birthday]
        await db.executeSql(query,parameters);
      } catch (error) {
        console.error(error);
        throw Error('Failed to create customer !!!');
      }
}



export const updateCustomer = async( 
    db: SQLiteDatabase,
    password:string,
    name: string,
    gender : string,
    phoneNumber : number,
    birthday: string,
    email: string
) => {
try{
    const query = 'UPDATE customer SET password=?,name=?,gender=?,phoneNumber=?,birthday=? WHERE email=?';
    const parameters = [password,name, gender,phoneNumber,birthday,email]
    await db.executeSql(query,parameters);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update customer !!!');
  }
}

export const deleteCustomer = async( 
    db: SQLiteDatabase,
    email: string
    ) => {
    try{
        const query = 'DELETE FROM customer WHERE email = ?' ;
        await db.executeSql(query,[email]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete customer !!!');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}