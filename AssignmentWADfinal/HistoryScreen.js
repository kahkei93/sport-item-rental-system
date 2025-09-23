import React, { useState, useEffect , useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const HistoryScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoryFromAPI();
  }, []);

  
  const fetchHistoryFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.68.107:3000/api/bookings`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to load rental history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : historyData.length === 0 ? (
          <Text style={styles.emptyText}>No rental history available</Text>
        ) : (
          historyData.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.details}>
                <Text style={styles.itemName}>{item.item_name}</Text>
                <Text style={styles.label}>Rent Date</Text>
                <Text style={styles.value}>{item.rent_date}</Text>
                <Text style={styles.label}>Rent Time</Text>
                <Text style={styles.value}>{item.rent_time}</Text>
                <Text style={styles.label}>Amount</Text>
                <Text style={[styles.value, styles.amount]}>${item.amount.toFixed(2)}</Text>
                <Text style={[
                  styles.status,
                  item.status === 'completed' ? styles.completed : styles.pending
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  amount: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  status: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  completed: {
    backgroundColor: '#e6f7ee',
    color: '#00a854',
  },
  pending: {
    backgroundColor: '#fff7e6',
    color: '#fa8c16',
  },
});

export default HistoryScreen;
