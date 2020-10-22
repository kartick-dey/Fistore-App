import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

import Header from '../../components/header';
import colors from '../../constants/colors';

import * as productActions from '../../store/actions/product';

const AddPost = (props) => {
  const productData = new FormData();
  const dispatch = useDispatch();

  const [fishName, setFishName] = useState('');
  const [fishCategory, setFishCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState({
    uri: '',
    type: '',
    fileName: '',
    fileSize: 0
  });



  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  // Image Handling function
  const handleSelectPhoto = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response.uri, response.type, response.fileName);
      setImage({
        uri: response.uri,
        type: response.type,
        fileName: response.fileName,
        fileSize: response.fileSize
      })
      console.log("Image from input: ", image);
      productData.append('image', image);


    });
  };

  const onSubmit = () => {
    productData.append('fishName', fishName);
    productData.append('fishCategory', fishCategory.toUpperCase());
    productData.append('price', +price);
    productData.append('unit', unit.toUpperCase());
    productData.append('location', location);
    productData.append('contact', +contact);

    try {
      dispatch(productActions.createProduct(productData, (error, result) => {
        if (error) {
          console.log("Error in Add Post: ", error);
          return;
        }
        console.log("Result in Add Post: ", result);
        alert("Successfully Saved")
      }));
      
    } catch (error) {
      console.log("Error while submit the form in backend")
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onOpenDrawer={openDrawer}></Header>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Fish Name</Text>
            <TextInput style={styles.input} value={fishName} onChangeText={text => setFishName(text)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Fish Category</Text>
            <Picker style={styles.itemPicker}
              onValueChange={(item, itemIndex) => setFishCategory(item)}>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Fish Spawn" value="Spawn" />
              <Picker.Item label="Fish Seed" value="Seed" />
              <Picker.Item label="Fish" value="Fish" />
              <Picker.Item label="Aqurium Fish" value="Aqurium" />
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}/>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Unit</Text>
            <Picker style={styles.itemPicker}
            onValueChange={(item, itemIndex) => setUnit(item)}>
              <Picker.Item label="Select a unit" value="" />
              <Picker.Item label="Packet" value="Packet" />
              <Picker.Item label="Piece" value="Piece" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="gm" value="gm" />
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={text => setLocation(text)}/>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Contact No.</Text>
            <TextInput style={styles.input} value={contact} onChangeText={text => setContact(text)}/>
          </View>
          <View style={styles.formControl}>
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
                <FontAwesome name="photo" />
                <Text style={styles.uploadButtonTitle}>Upload a Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonConatiner}>
            <LinearGradient style={{ width: '50%' }} colors={[colors.primary, colors.liner]}>
              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonTitle}>Create Post</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 6,
    fontWeight: '700'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  itemPicker: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderWidth: 2

  },
  uploadContainer: {
    paddingVertical: 20,
  },
  uploadButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#dddddd',
  },
  uploadButtonTitle: {
    fontWeight: '700',
    paddingHorizontal: 10
  },
  buttonConatiner: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddPost;
