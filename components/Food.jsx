import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/AntDesign";

const Food = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    if (route.params?.newItem) {
      setFoodItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const deleteItem = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  const openDetailsModal = (item) => {
    setSelectedFood(item);
    setIsModalVisible(true); 
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#003366", height: 80, alignItems: 'center', elevation: 3, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 70 }}>Foods</Text>
        <TouchableOpacity style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: 5, flexDirection: 'row', borderColor: 'white', borderWidth: 1, marginTop: 20 }} onPress={() => navigation.navigate("Add")}>
          <Text style={{ color: 'white', fontSize: 16, marginRight: 5 }}>Add new</Text>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDetailsModal(item)}>
            <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 3 }}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
              ) : (
                <View style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: 'gray' }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>Rs.{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22, backgroundColor: 'transparent' }}>
          <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, minWidth: 250 }}>
            {selectedFood && (
              <View>
                <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{selectedFood.name}</Text>
                <Text>{selectedFood.description}</Text>
                {selectedFood.offer && (
                  <Text>Offer: {selectedFood.offerPer}% </Text>
                )}
                {selectedFood.tags && (
                  <Text>Tags: {selectedFood.tags.join(", ")}</Text>
                )}
                {selectedFood.sides && (
                  <Text>Sides: {selectedFood.sides.join(", ")}</Text>
                )}
                {selectedFood.drinks && (
                  <Text>Drinks: {selectedFood.drinks.join(", ")}</Text>
                )}
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginTop: 10 }}>Rs.{selectedFood.price}</Text>
              </View>
            )}
            <TouchableOpacity style={{ backgroundColor: '#003366', borderRadius: 20, padding: 10, marginTop: 10, elevation: 2 }} onPress={() => setIsModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Food;
