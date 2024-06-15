import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, View } from "react-native";

import Homepage from "./components/Homepage";
import Buttonnavbar from "./components/Buttonnavbar";
import Food from "./components/Food";
import Add from "./components/Add";
import Tags from "./components/Tags";
import Orders from "./components/Orders";
const Stack = createStackNavigator();

const App = ({ navigation }) => {
  return (

      <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Add"
              component={Add}
              options={{ headerShown: false }}
            />
             <Stack.Screen name="Food" component={Food} options={{ headerShown: false }}/>
             <Stack.Screen name="Tags" component={Tags} options={{ headerShown: false }}/>
             <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
           
          </Stack.Navigator>
          <Buttonnavbar navigation={navigation} />
        </View>
      </NavigationContainer>
 
  );
};

const HomeScreen = () => (
  <>
   <View style={{flex:1 }}>
  <ScrollView style={{ marginTop: 25 ,paddingTop:0}} >
    <Homepage />
  </ScrollView>
  
</View>

  </>
);

export default App;
