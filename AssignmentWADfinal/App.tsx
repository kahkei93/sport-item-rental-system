import React from "react";
import ProfileScreen from "./ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./LoginScreen"
import SignUp from "./SignUpScreen";
import BadmintonDetail from "./BadmintonDetail";
import FootBallDetail from "./FootBallDetail";
import PingPongRacket from "./PingPongRacket";
import PingPongBallDetail from "./PingPongBallDetail";
import PickleBallRacket from "./PickleBallRacket";
import PickleBall from "./PickleBall";
import BasketBallDetail from "./BasketBallDetail";
import VolleyBallDetail from "./VolleyBallDetail";
import HistoryScreen from "./HistoryScreen";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

const App = ()=> {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            >
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
           >
          </Stack.Screen>
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} >
          </Stack.Screen>
          <Stack.Screen
            name="profile"
            component={ProfileScreen}>
          </Stack.Screen>
          <Stack.Screen name="BadmintonDetail" component={BadmintonDetail} />
          <Stack.Screen name="FootballDetail" component={FootBallDetail} />
          <Stack.Screen name="PingPongRacketDetail" component={PingPongRacket} />
          <Stack.Screen name="PingPongBallDetail" component={PingPongBallDetail} />
          <Stack.Screen name="PickleRacketDetail" component={PickleBallRacket} />
          <Stack.Screen name="PickleBallDetail" component={PickleBall} />
          <Stack.Screen name="BasketballDetail" component={BasketBallDetail} />
          <Stack.Screen name="VolleyballDetail" component={VolleyBallDetail} />
          <Stack.Screen 
          name="History" 
          component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}


export default App;
