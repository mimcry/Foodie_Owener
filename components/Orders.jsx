import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = React.useState([
    {
      id: '1',
      datetime: '2024-06-12 10:30 AM',
      location: 'Restaurant XYZ',
      itemName: 'Pizza',
      price: '1099',
      sides: 'Garlic Bread',
      drinks: 'Coke',
      message: 'Extra cheese'
    },
    {
      id: '2',
      datetime: '2024-06-13 12:45 PM',
      location: 'Restaurant ABC',
      itemName: 'Burger',
      price: '849',
      sides: 'Fries',
      drinks: 'Pepsi',
      message: 'No onions'
    },
  ]);

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={{
      backgroundColor: '#FFFFFF',
      padding: 15,
      marginBottom: 10,
      borderRadius: 15,
      elevation: 3,
      borderColor: '#CCCCCC',
      borderWidth: 1
    }}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => deleteOrder(item.id)}>
        <Icon name="closecircle" size={22} color="#FF6600" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Date & Time: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.datetime}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Location: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.location}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Order Items: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.itemName}</Text>
      </View>
      
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Sides: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.sides}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Drinks: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.drinks}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Message: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.message}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Price: </Text>
      <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>Rs {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View style={{ backgroundColor: '#003366', height: 80, alignItems: 'center', elevation: 3, flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20, marginLeft: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 120 }}>Orders</Text>
      </View>
      <View style={{ padding: 25, paddingTop: 0 }}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          
        />
      </View>
    </View>
  );
};

export default Orders;
