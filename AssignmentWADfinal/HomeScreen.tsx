import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const items = [
  { id: "1", name: "Badminton", image: require("./image/badminton1.jpg") ,screen:'BadmintonDetail'},
  { id: "2", name: "Football", image: require("./image/football1.jpg") ,screen:'FootballDetail'},
  { id: "3", name: "Ping Pong Racket", image: require("./image/pingpongracket1.jpg") ,screen:'PingPongRacketDetail'},
  { id: "4", name: "Ping Pong Ball", image: require("./image/pingpongball1.jpg"),screen:'PingPongBallDetail' },
  { id: "5", name: "Pickle Ball Racket", image: require("./image/pickleballracket1.jpg"),screen:'PickleRacketDetail' },
  { id: "6", name: "Pickle Ball", image: require("./image/pickleball.jpg"),screen:'PickleBallDetail' },
  { id: "7", name: "Basketball", image: require("./image/basketball1.jpg"),screen:'BasketballDetail' },
  { id: "8", name: "Volleyball", image: require("./image/volleyball1.jpg"),screen:'VolleyballDetail' },
];

const HomeScreen = ({route,navigation}:any) => {
  const email = route?.params?.email;
  const renderItem = ({ item }:any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.screen,{email})}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('History',{email})}>
          <MaterialCommunityIcons name='clock' size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('profile', { email })}>
          <MaterialCommunityIcons name='account' size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Grid of items */}
      <FlatList
        data={items}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 10,
  },
  grid: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    backgroundColor: "#ccc",
  },
  label: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default HomeScreen;