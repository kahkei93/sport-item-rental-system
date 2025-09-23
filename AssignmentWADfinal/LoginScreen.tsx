import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import {getCustomerByEmail } from './db-service';

SQLite.enablePromise(true);

var dbName='customer.sqlite';

const Login = ({navigation}:any ) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  // Initialize database
  useEffect(() => {
    const initDB = async () => {
      try {
        let database = await SQLite.openDatabase(
          { name: dbName, createFromLocation: "~customer.sqlite"},
          () => console.log('Login DB connected'),
          (err) => console.error('DB error 1:', err)
        );
        setDb(database);
      } catch (error) {
        console.error('Failed to initialize DB:', error);
      }
    };

//    createDB();
    initDB();

    return () => {
      if (db) db.close();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!db) {
      Alert.alert('Error', 'Database not ready');
      return;
    }

    try {
      const customer = await getCustomerByEmail(db, email);
      
      if (!customer) {
        Alert.alert('Error', 'User not found');
        return;
      }

      if (customer.password !== password) {
        Alert.alert('Error', 'Incorrect password');
        return;
      }

      // Successful login 
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('HomeScreen', { email: customer.email }); 
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPORT ITEM RENTAL</Text>

      <View style={styles.loginBox}>
        <Text style={styles.header}>LOGIN</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter email" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter password" 
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          No account? 
          <Text 
            style={styles.signupLink}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  loginBox: {
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signup: {
    fontSize: 14,
  },
  signupLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default Login;

