import React,{useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';

const BasketBall = ({navigation,route}) =>{
const { userEmail } = route.params;
const [quantity, setQuantity] = useState(1);

const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
const [showDatePicker, setShowDatePicker] = useState(false); // To show/hide date picker

const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false); // Hide picker after date selection
    setSelectedDate(currentDate); // Set the selected date
};

const [selectedTime, setSelectedTime] = useState(null);

const timeSlots = [
    { label: "10 AM - 11 AM", value: "10 AM - 11 AM" },
    { label: "11 AM - 12 PM", value: "11 AM - 12 PM" },
    { label: "12 PM - 1 PM", value: "12 PM - 1 PM" },
    { label: "1 PM - 4 PM", value: "1 PM - 4 PM" },
    { label: "4 PM - 7 PM", value: "4 PM - 7 PM" },
    { label: "7 PM - 10 PM", value: "7 PM - 10 PM" }
];

    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground
                    source={require('./image/basketball1.jpg')}
                    style={styles.image}
                    >
                    {/*button*/ }
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons 
                                name="arrow-left" 
                                size={50} 
                                color="white" />
                        </TouchableOpacity>
                    </View> 
                </ImageBackground>
                    {/*description header*/ }
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Basketball
                        </Text>
                    </View>
                    {/*description details*/ }
                    <View style={styles.titleContainer}>
                        <Text style={styles.description}>
                        Rent a high-quality basketball for your game or practice!
                        </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>
                            Details
                        </Text>
                    </View>
                    {/*description details*/ }
                    <View style={styles.titleContainer}>
                        <Text style={styles.description}>
                        Material: Composite Leather
                        {'\n'}Size: Official Size 7 (29.5 inches) or Size 6 (28.5 inches)
                        </Text>
                    </View>
                    {/*Selection for date*/}
                    <Text style={styles.time}>Choose a date:</Text>
                        <TouchableOpacity
                            style={styles.timeSlotButton}
                            onPress={() => setShowDatePicker(true)} // Show date picker when pressed
                        >
                            <Text style={styles.timeSlotText}>
                                {selectedDate.toLocaleDateString()} {/* Format selected date */}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date" // Select date mode
                                display="default"
                                onChange={onDateChange} // Handle date change
                            />
                        )}
                        <View>
                         <Text style={styles.time}>Choose a time slot:</Text>
                            <ScrollView horizontal={true} contentContainerStyle={styles.timeSlotsContainer}>
                             <View style={styles.timeSlotsContainer}>
                                {timeSlots.map((time, index) => (
                                    <TouchableOpacity
                                        key={index}  // Use index or a unique value from the time slot
                                        style={styles.timeSlotButton}
                                        onPress={() => setSelectedTime(time.value)}
                                    >
                                        <Text style={styles.timeSlotText}>{time.label}</Text>
                                    </TouchableOpacity>
                            ))}
                                </View>
                            </ScrollView>
                        </View>
                     <Text style={styles.selectedText}>Selected Date & Time :{selectedDate?selectedDate.toLocaleDateString() : 'None'} {selectedTime ? selectedTime : 'None'} </Text>
                
                    <View style={styles.quantityContainer}>
  <Text style={styles.quantityLabel}>Quantity</Text>

  <TouchableOpacity
    onPress={() => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        Alert.alert('Minimum 1 item');
      }
    }}
    style={styles.quantityButton}
  >
    <MaterialCommunityIcons name="minus" size={24} color="black" />
  </TouchableOpacity>

  <Text style={styles.quantityValue}>{quantity}</Text>

  <TouchableOpacity
    onPress={() => setQuantity(quantity + 1)}
    style={styles.quantityButton}
  >
    <MaterialCommunityIcons name="plus" size={24} color="black" />
  </TouchableOpacity>
  <TouchableOpacity
  style={styles.confirmButton}
  onPress={async () => {
    if (!selectedTime) {
      Alert.alert('Please select a time slot');
      return;
    }

    const newBooking = {
      user_email: userEmail,
      item_name: 'Basket Ball',
      rent_date: selectedDate.toLocaleDateString(),
      rent_time: selectedTime,
      amount: quantity * 5, // assume $5 per item
      status: 'pending',
    };

    try {
      const response = await fetch(`http://192.168.68.107:3000/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });
  
      if (!response.ok) throw new Error('Failed to book');
  
      Alert.alert('Success', 'Booking confirmed!');
      navigation.navigate('History');
    } catch (error) {
      Alert.alert('Error', 'Failed to confirm booking');
      console.error(error);
    }
  }}
>
  <Text style={styles.confirmButtonText}>Confirm</Text>
</TouchableOpacity>
</View>
    
        </ScrollView>
        </SafeAreaView>
        </GestureHandlerRootView>
    );
};
export default BasketBall;

const styles = StyleSheet.create({
    image: {
      width: '100%', // full width of screen
      height: 300, // 1/4 of screen height
      resizeMode: 'cover', // (optional) scale the image nicely
      justifyContent: 'flex-start', // make sure inner View stays at top

    },
    container: {
      paddingBottom: 30,
      backgroundColor: '#F4F6F8',
    },
    titleContainer: {
        marginTop: 5, // Spacing between image and text
        marginLeft: 10, // Align text to the left
    },
    detailContainer:{
        fontSize:15,
        marginTop: 1, // Spacing between image and text
        marginLeft: 10, // Align text to the left
    },
    title: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        color: '#333333',
        fontWeight: 'bold',
    },
    description: {
        marginLeft: 20,
        marginRight:20,
        fontSize: 15,
        color: '#666666',
        fontWeight: 'normal',
    },
    time:{
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        color: '#333333',
        fontWeight: 'bold',
    },
    timeSlotsContainer: {
        flexDirection: 'row', // Aligns the buttons horizontally
        justifyContent:'space-between',
    },
    timeSlotButton: {
        flexDirection: 'row', // Aligns the buttons horizontally
        justifyContent:'space-between',
        borderWidth:2,
        borderColor:'white',
        backgroundColor: '#D3D3D3',
        paddingHorizontal: 10,
        paddingVertical:5,
        margin: 5,
        borderRadius: 5,
    },

    timeSlotText: {
        fontSize: 16,
        color: 'black',
    },
    selectedText: {
        fontSize: 16,
        marginTop: 10,
        color: '#333333',
        marginLeft: 20,
        fontWeight:'bold',
    },
    confirmButton: {
        position: 'absolute',
        bottom: -10,
        right: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5,
        marginLeft: 10,
      },
      quantityLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
        color:'black',
      },
      quantityButton: {
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 5,
      },
      quantityValue: {
        fontSize: 18,
        marginHorizontal: 10,
        minWidth: 20,
        textAlign: 'center',
      },
  });
 