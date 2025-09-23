import sqlite3
db = sqlite3.connect('customer.sqlite')

db.execute('DROP TABLE IF EXISTS customer')

db.execute('''CREATE TABLE customer(
    email text PRIMARY KEY,
    password text NOT NULL,
    name text NOT NULL,
    gender text NOT NULL,
    phoneNumber integer NOT NULL,
    birthday text NOT NULL
)''')

cursor = db.cursor()
cursor.execute('''
    INSERT INTO customer(email,password,name,gender,phoneNumber,birthday)
    VALUES('sample@gmail.com','1234','ADAM','male',123456789,'28May2000')
''')
cursor.execute('''
    INSERT INTO customer(email,password,name,gender,phoneNumber,birthday)
    VALUES('admin@gmail.com','0000','Admin','male',123456789,'5May2000')
''')

db.commit()
db.close()