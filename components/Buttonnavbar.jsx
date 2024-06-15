import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";


const Buttonnavbar = () => {
  const navigation =useNavigation();
  

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        elevation: 50,paddingLeft:20,paddingRight:20
      }}
    >
     
      <View >
      <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("Home")}> 
      <Icon name="home" size={20} color="gray" style={{alignSelf:"center"}} />
        <Text style={{ color: "gray" }}>Home</Text></TouchableOpacity>
       
      </View>
      <View style={{ marginLeft: "auto", color: "gray" }} >
      <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("Orders")}>
         <Icon name="copy1" size={20} style={{ color: "gray",alignSelf:"center" }}/>
        <Text style={{ color: "gray" }} >Orders</Text></TouchableOpacity>
       
      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
      <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("Food")}>
      <Icon name="pluscircle" size={20} style={{ color: "gray" ,alignSelf:"center"}}   />
        <Text style={{ color: "gray" }}>Add Item </Text>
      </TouchableOpacity>
        
      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
      <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("Tags")}>
      <Icon name="tags" size={20} style={{ color: "gray" ,alignSelf:"center"}}  />
        <Text style={{ color: "gray" }}>Add tags</Text>
      </TouchableOpacity>
       
      </View>
      
    </View>
  );
};

export default Buttonnavbar;
