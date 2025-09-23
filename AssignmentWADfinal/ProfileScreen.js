import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { getDBConnection, getCustomerByEmail } from "./db-service"; // adjust path if needed

const ProfileScreen = ({ navigation, route }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = route?.params?.email;

  useEffect(() => {
    if (!email) {
      console.error("No email provided to ProfileScreen");
      return;
    }
    const loadProfile = async () => {
      try {
        const db = await getDBConnection();
        const customer = await getCustomerByEmail(db, email);
        setProfileData(customer);
      } catch (error) {
        console.error("Failed to fetch profile from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Profile not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>PROFILE</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./image/profilePic.png')} style={styles.profileImage} />
      </View>
      <View style={styles.infoSection}>
        <ProfileItem label="Name" value={profileData.name} />
        <ProfileItem label="Gender" value={profileData.gender} />
        <ProfileItem label="Birthday" value={profileData.birthday} />
        <ProfileItem label="Phone Number" value={profileData.phoneNumber?.toString()} />
        <ProfileItem label="Email" value={profileData.email} />
      </View>
    </View>
  );
};

const ProfileItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  infoSection: {
    paddingHorizontal: 10,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ProfileScreen;