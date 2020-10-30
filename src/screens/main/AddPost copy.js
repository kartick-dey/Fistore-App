import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';


import Header from '../../components/header';
import colors from '../../constants/colors';

import * as productActions from '../../store/actions/product';
import Images from '../../constants/images';

const AddPost = (props) => {
  const dummyDesc = `Fish farming or pisciculture involves raising fish commercially in tanks or enclosures 
  such as fish ponds, usually for food. A facility that releases juvenile fish into the wild for recreational
  fishing or to supplement a species natural numbers is generally referred to as a fish hatchery.`;
  const { name, userId } = useSelector(state => state.auth)
  console.log("userId from AddPost: ", userId);
  const dispatch = useDispatch();

  const [isUploading, setIsUploading] = useState(false);
  const [fishName, setFishName] = useState('');
  const [fisheryName, setFisheryName] = useState('');
  const [fishCategory, setFishCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [availableTill, setAvailableTill] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locality, setLocality] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({
    uri: null,
    type: null,
    fileName: null,
    fileSize: null,
    path: null
  });

  const openDrawer = () => {
    props.navigation.openDrawer();
  };
  const openProfileScreen = () => {
      props.navigation.navigate('Profile');
  }

  // Image Handling function
  const handleSelectPhoto = () => {
    const options = {
      quality: 0.5
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log("Image response: ", response);
      console.log("response.uri: ", response.uri);
      console.log("response.filename: ", response.fileName);
      console.log("response.type: ", response.type);
      console.log("response.path: ", response.path);
      // console.log(response.uri, response.type, response.fileName, response.path);
      const img = {
        uri: response.uri,
        type: response.type,
        fileName: response.fileName,
        fileSize: response.fileSize,
        path: response.path
      };
      setImage(img);
      console.log("Image from input: ", image);


    });
  };

  const showDate = () => {
    setShowDatePicker(true);
  };
  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || availableTill;
    setAvailableTill(currentDate);
  };

  const onSubmit = () => {
    setIsUploading(true);
    const productData = {
      userId: userId,
      username: name,
      fisheryName: fisheryName,
      fishName: fishName,
      fishCategory: fishCategory.toUpperCase(),
      price: +price,
      unit: unit.toUpperCase(),
      // availableTill: new Date(availableTill).toISOString(),
      location: locality + ', ' + district + ', ' + state,
      contact: +contact,
      description: description || dummyDesc,
      image: image,
    }


    try {
      dispatch(productActions.createProduct(productData, (error, result) => {
        if (error) {
          console.log("Error in Add Post: ", error);
          Alert.alert("Status", error);
          setIsUploading(false);
          return;
        }
        console.log("Result in Add Post: ", result);
        Alert.alert("Status", "Successfully Saved");
        setIsUploading(false);
      }));

    } catch (error) {
      console.log("Error while submit the form in backend");
      Alert.alert("Status", 'Please check your data connection!');
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <Header onOpenDrawer={openDrawer} onOpenProfile={openProfileScreen}></Header>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Fishery Center</Text>
            <TextInput placeholder="Ex. Somenath Fishry" autoCapitalize='words' style={styles.input} value={fisheryName}
              onChangeText={text => setFisheryName(text)} />
            {/* android:windowSoftInputMode="adjustPan | adjustResize" */}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Name of Fish</Text>
            <TextInput placeholder="Ex. Katla" style={styles.input} value={fishName}
              onChangeText={text => setFishName(text)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Category</Text>
            <Picker style={styles.itemPicker}
              selectedValue={fishCategory}
              onValueChange={(item, itemIndex) => setFishCategory(item)}>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Fish Spawn" value="Spawn" />
              <Picker.Item label="Fish Seed" value="Seed" />
              <Picker.Item label="Fish" value="Fish" />
              <Picker.Item label="Sea Fish" value="Sea Fish" />
              <Picker.Item label="Aqurium Fish" value="Aqurium" />
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput placeholder="Ex. 300" keyboardType='decimal-pad' style={styles.input} value={price}
              onChangeText={text => setPrice(text)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Unit</Text>
            <Picker style={styles.itemPicker}
              selectedValue={unit}
              onValueChange={(item, itemIndex) => setUnit(item)}>
              <Picker.Item label="Select a unit" value="" />
              <Picker.Item label="Packet" value="Packet" />
              <Picker.Item label="Piece" value="Piece" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="gm" value="gm" />
            </Picker>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Availability till</Text>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => showDate()}>
              <Text style={{ width: '70%' }}> 
              { availableTill === new Date() ? 'Select a Date' : new Date(availableTill).toDateString() }</Text>
              <FontAwesome name="calendar" size={20} />
            </TouchableOpacity>
            {showDatePicker && <DateTimePicker
              testID="dateTimePicker"
              value={availableTill}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Locality</Text>
            <TextInput placeholder="Ex. Ramsagar" style={styles.input} value={locality}
              onChangeText={(text) => { setLocality(text) }} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>District</Text>
            <TextInput placeholder="Ex. Bankura" style={styles.input} value={district}
              onChangeText={(text) => { setDistrict(text) }} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>State</Text>
            <TextInput placeholder="Ex. West Bangal" style={styles.input} value={state}
              onChangeText={(text) => { setState(text) }} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Contact No.</Text>
            <TextInput placeholder="+91-" style={styles.input} keyboardType='phone-pad' value={contact}
              onChangeText={text => setContact(text)} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={4} value={description} onChangeText={(text) => { setDescription(text) }} />
          </View>
          <View style={styles.formControl}>
            <View style={styles.uploadContainer}>
              {image.uri ? (<View style={styles.imageContainer}>
                {/* <Image source={Images.aqurium_1} style={styles.image}></Image> */}
                <Image source={{ uri: image.uri }} style={styles.image}></Image>
              </View>) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
                  <FontAwesome name="photo" />
                  {image.uri ? <Text style={styles.uploadButtonTitle}>Change Image</Text> :
                    <Text style={styles.uploadButtonTitle}>Upload a Image</Text>}
                </TouchableOpacity>
                <View style={{flexWrap: 'wrap' }}>
                {image.fileName ? <Text style={{ paddingLeft: 5,}}>{image.fileName}</Text> : null}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonConatiner}>
            <LinearGradient style={{ width: '50%' }} colors={[colors.primary, colors.liner]}>
              <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={isUploading}>
                {isUploading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonTitle}>Create Post</Text>}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 20,
    marginTop: 10
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
    backgroundColor: '#dddddd',
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderWidth: 2

  },
  uploadContainer: {
    paddingVertical: 20,
  },
  uploadButton: {
    width: '40%',
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
  imageContainer: {
    width: width - 40,
    height: 190,
    marginBottom: 10
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    borderRadius: 5
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
