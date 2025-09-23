import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { createCustomer } from './db-service';

// Define types for the customer data
type CustomerData = {
  email: string;
  password: string;
  name: string;
  gender: string;
  phoneNumber: number;
  birthday: string;
};

const SignUp = () => {
  // Form state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  // Initialize database
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabase(
          { name: 'customer.sqlite', location: 'default' },
          () => console.log('Database connected'),
          (error: any) => console.error('Database error:', error)
        );
        setDb(database);
      } catch (error) {
        console.error('Failed to initialize DB:', error);
      }
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const handleSignUp = async () => {
    // Input validation
    if (!email || !password || !confirmPassword || !name || !gender || !phoneNumber || !birthday) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (!db) {
      Alert.alert('Error', 'Database not initialized');
      return;
    }

    try {
      await createCustomer(
        db,
        email,
        password,
        name,
        gender,
        parseInt(phoneNumber, 10),
        birthday
      );
      Alert.alert('Success', 'Account created successfully!');
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setGender('');
      setPhoneNumber('');
      setBirthday('');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ScrollView contentContainerStyle={[styles.container,{flexGrow:1}]}>
      <Text style={styles.title}>SPORT ITEM RENTAL</Text>

      <View style={styles.signupBox}>
        <Text style={styles.header}>SIGN UP</Text>

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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>GENDER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gender (e.g., male/female)"
          value={gender}
          onChangeText={setGender}
        />

        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>BIRTHDAY</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter birthday (e.g., 28May2000)"
          value={birthday}
          onChangeText={setBirthday}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  signupBox: {
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignUp