import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform, ScrollView, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";


const Add = ({ navigation }) => {
  const [imageData, setImageData] = useState(null);
  const [offerEnabled, setOfferEnabled] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [tags, setTags] = useState([
    { name: 'Pizza', value: 'pizza' },
    { name: 'Burger', value: 'burger' },
    { name: 'Pasta', value: 'pasta' },
  ]);

  const [sides, setSides] = useState([
    { name: 'Fries', value: 'fries' },
    { name: 'Salad', value: 'salad' },
    { name: 'Garlic Bread', value: 'garlic_bread' },
  ]);

  const [drinks, setDrinks] = useState([
    { name: 'Coke', value: 'coke' },
    { name: 'Pepsi', value: 'pepsi' },
    { name: 'Water', value: 'water' },
  ]);

  const [newItem, setNewItem] = useState({
    id:"", 
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    offer: false,
    offerPer: '',
    tags: [],
    sides: [],
    drinks: [],
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) {
      setImageData(result.assets[0]);
      handleInputChange('imageUrl', result.assets[0].uri);
    }
  };

  const handleInputChange = (key, value) => {
    setNewItem(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setErrorMessages(prevErrors => ({ ...prevErrors, [key]: '' }));
  };

  const validateInputs = () => {
    const errors = {};
    if (!newItem.name) errors.name = 'Item name is required';
    if (!newItem.price) errors.price = 'Item price is required';
    if (!newItem.description) errors.description = 'Item description is required';
    if (newItem.tags.length === 0) errors.tags = 'At least one tag is required';
    if (newItem.sides.length === 0) errors.sides = 'At least one side is required';
    if (newItem.drinks.length === 0) errors.drinks = 'At least one drink is required';
    return errors;
  };

  const handleUpload = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    console.log('New Item:', newItem);

    navigation.navigate('Food', {
      newItem,
    });

    setNewItem({
      id:"", 
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      offer: false,
      offerPer: '',
      tags: [],
      sides: [],
      drinks: [],
    });
    setImageData(null);
    setOfferEnabled(false);
  };

  const handleTagSelection = (tag) => {
    if (!newItem.tags.includes(tag.value)) {
      const updatedTags = [...newItem.tags, tag.value];
      setNewItem(prevState => ({
        ...prevState,
        tags: updatedTags,
      }));
    }
  };

  const handleSideSelection = (side) => {
    if (!newItem.sides.includes(side.value)) {
      const updatedSides = [...newItem.sides, side.value];
      setNewItem(prevState => ({
        ...prevState,
        sides: updatedSides,
      }));
    }
  };

  const handleDrinkSelection = (drink) => {
    if (!newItem.drinks.includes(drink.value)) {
      const updatedDrinks = [...newItem.drinks, drink.value];
      setNewItem(prevState => ({
        ...prevState,
        drinks: updatedDrinks,
      }));
    }
  };

  const renderDropdown = (items, onSelect, selectedItems, placeholder) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{placeholder}:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dropdownScroll}
      >
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                selectedItems.includes(item.value) && styles.dropdownItemSelected,
              ]}
              onPress={() => onSelect(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.chipsContainer}>
        {selectedItems.map((itemValue, index) => (
          <Chip
            key={index}
            style={styles.chip}
            onClose={() => {
              switch (placeholder) {
                case 'Select Tags':
                  setNewItem(prevState => ({
                    ...prevState,
                    tags: newItem.tags.filter(value => value !== itemValue),
                  }));
                  break;
                case 'Select Sides':
                  setNewItem(prevState => ({
                    ...prevState,
                    sides: newItem.sides.filter(value => value !== itemValue),
                  }));
                  break;
                case 'Select Drinks':
                  setNewItem(prevState => ({
                    ...prevState,
                    drinks: newItem.drinks.filter(value => value !== itemValue),
                  }));
                  break;
                default:
                  break;
              }
            }}
          >
            {items.find(item => item.value === itemValue)?.name}
          </Chip>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
       <View style={{ backgroundColor: '#003366', height: 80, alignItems: 'center', elevation: 3, flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20, marginLeft: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 120 }}>Add new </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          placeholder="Enter Item Name"
          style={[styles.input, errorMessages.name && styles.errorBorder]}
          value={newItem.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

        <TextInput
          placeholder="Enter Item Price"
          style={[styles.input, errorMessages.price && styles.errorBorder]}
          value={newItem.price}
          onChangeText={text => handleInputChange('price', text)}
          keyboardType='numeric'
        />
        {errorMessages.price && <Text style={styles.errorText}>{errorMessages.price}</Text>}

        <TextInput
          placeholder="Enter Item Description"
          style={[styles.input, { height: 100, textAlignVertical: 'top' }, errorMessages.description && styles.errorBorder]}
          multiline
          value={newItem.description}
          onChangeText={text => handleInputChange('description', text)}
        />
        {errorMessages.description && <Text style={styles.errorText}>{errorMessages.description}</Text>}

        <View style={styles.switchContainer}>
          <Text>Enable Offer</Text>
          <Switch
            value={offerEnabled}
            onValueChange={(value) => {
              setOfferEnabled(value);
              handleInputChange('offer', value);
            }}
          />
        </View>
        {offerEnabled && (
          <TextInput
            placeholder="Enter Offer Percentage"
            style={styles.input}
            value={newItem.offerPer}
            onChangeText={text => handleInputChange('offerPer', text)}
            keyboardType='numeric'
          />
        )}

        {renderDropdown(tags, handleTagSelection, newItem.tags, 'Select Tags')}
        {errorMessages.tags && <Text style={styles.errorText}>{errorMessages.tags}</Text>}

        {renderDropdown(sides, handleSideSelection, newItem.sides, 'Select Sides')}
        {errorMessages.sides && <Text style={styles.errorText}>{errorMessages.sides}</Text>}

        {renderDropdown(drinks, handleDrinkSelection, newItem.drinks, 'Select Drinks')}
        {errorMessages.drinks && <Text style={styles.errorText}>{errorMessages.drinks}</Text>}

        {imageData && (
          <Image 
            source={{ uri: imageData.uri }}
            style={styles.image}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={openGallery}
        >
          <Ionicons name="image-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Select Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleUpload}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#003366',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownScroll: {
    flexGrow: 1,
  },
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: 'gray',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    
  },
  chip: {
    margin: 4,
    backgroundColor: 'gray',
    color:"white"
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  uploadButton: {
    backgroundColor: '#003366',
    
  },
  uploadText: {
    fontSize: 16,
    color:"white",
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginTop: -5,
    fontSize: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
});

export default Add;

