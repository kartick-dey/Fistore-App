import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';


import Header from '../../components/header';

import * as productActions from '../../store/actions/product';
import Wizard from '../../components/postWizard';

const AddPost = (props) => {
  const { name, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const initialValues = {
    userId: userId,
    username: name,
    fisheryName: '',
    fishName: '',
    fishCategory: '',
    price: '',
    unit: '',
    availableTill: new Date(),
    showDatePicker: false,
    locality: '',
    district: '',
    state: '',
    contact: '',
    description: '',
    image: {
      uri: null,
      type: null,
      fileName: null,
      fileSize: null,
      path: null
    }
  };

  const openDrawer = () => {
    props.navigation.openDrawer();
  };
  const openProfileScreen = () => {
    props.navigation.navigate('Profile');
  }

  const onSubmit = (productData) => {
    console.log('productData: ', productData);
    try {
      dispatch(productActions.createProduct(productData, (error, result) => {
        if (error) {
          console.log("Error in Add Post: ", error);
          Alert.alert("Status", error);
          return;
        }
        console.log("Result in Add Post: ", result);
        Alert.alert("Status", "Successfully Saved");
      }));

    } catch (error) {
      console.log("Error while submit the form in backend");
      Alert.alert("Status", 'Please check your data connection!');
    }
  };

  {/* android:windowSoftInputMode="adjustPan | adjustResize" */ }
  return (
    <View style={{ flex: 1, zIndex: 1, backgroundColor: '#fff' }}>
      <Header onOpenDrawer={openDrawer} onOpenProfile={openProfileScreen}></Header>
      <KeyboardAvoidingView style={{ flex: 1}} behavior="padding" keyboardVerticalOffset={100} >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.form}>
            <Wizard initialValues={initialValues} onSubmit={onSubmit.bind()}>
              {/* -------------------------- Product Information-------------------------------------------------- */}
              <Wizard.Step>
                {({ onChangeValue, values }) => (
                  <View style={{ flex: 1, width: '85%' }}>
                    <Text style={styles.contentTitle}>Product Information</Text>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Fishery Center</Text>
                      <TextInput placeholder="Ex. Somenath Fishry" autoCapitalize='words' style={styles.input} value={values.fisheryName}
                        // onChangeText={text => setFisheryName(text)} />
                        onChangeText={text => onChangeValue('fisheryName', text)} />
                      {/* android:windowSoftInputMode="adjustPan | adjustResize" */}
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Name of Fish</Text>
                      <TextInput placeholder="Ex. Katla" style={styles.input} value={values.fishName}
                        // onChangeText={text => setFishName(text)} />
                        onChangeText={text => onChangeValue('fishName', text)} />
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Category</Text>
                      <View style={styles.itemPickerContainer}>
                        <Picker style={styles.itemPicker}
                          selectedValue={values.fishCategory}
                          // onValueChange={(item, itemIndex) => setFishCategory(item)}>
                          onValueChange={(item, itemIndex) => onChangeValue('fishCategory', item)}>
                          <Picker.Item label="Select Category" value="" />
                          <Picker.Item label="Fish Spawn" value="Spawn" />
                          <Picker.Item label="Fish Seed" value="Seed" />
                          <Picker.Item label="Fish" value="Fish" />
                          <Picker.Item label="Sea Fish" value="Sea Fish" />
                          <Picker.Item label="Aqurium Fish" value="Aqurium" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                )}
              </Wizard.Step>

              {/* -------------------------- Pricing Details-------------------------------------------------- */}

              <Wizard.Step>
                {({ onChangeValue, onChangeDate, showdate, values }) => (
                  <View style={{ flex: 1, width: '85%' }}>
                    <Text style={styles.contentTitle}>Pricing Details</Text>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Price</Text>
                      <TextInput placeholder="Ex. 300" keyboardType='decimal-pad' style={styles.input} value={values.price}
                        // onChangeText={text => setPrice(text)} />
                        onChangeText={text => onChangeValue('price', text)} />
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Unit</Text>
                      <View style={styles.itemPickerContainer}>
                        <Picker style={styles.itemPicker}
                          selectedValue={values.unit}
                          // onValueChange={(item, itemIndex) => setUnit(item)}>
                          onValueChange={(item, itemIndex) => onChangeValue('unit', item)}>
                          <Picker.Item label="Select a unit" value="" />
                          <Picker.Item label="Packet" value="Packet" />
                          <Picker.Item label="Piece" value="Piece" />
                          <Picker.Item label="kg" value="kg" />
                          <Picker.Item label="gm" value="gm" />
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Availability till</Text>
                      <TouchableOpacity style={styles.dateContainer} onPress={showdate}>
                        <View style={styles.dateText}>
                          <Text>
                            {values.availableTill === new Date() ? 'Select a Date' : new Date(values.availableTill).toDateString()}</Text>
                        </View>
                        <FontAwesome name="calendar" size={20} style={{ paddingHorizontal: 20 }} />
                      </TouchableOpacity>
                      {values.showDatePicker && <DateTimePicker
                        testID="dateTimePicker"
                        value={values.availableTill}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                      />}
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Description</Text>
                      <TextInput style={styles.input} multiline={true} value={values.description}
                        onChangeText={(text) => { onChangeValue('description', text) }} />
                    </View>
                  </View>
                )}
              </Wizard.Step>

              {/* -------------------------- Contact Details-------------------------------------------------- */}

              <Wizard.Step>
                {({ onChangeValue, values }) => (
                  <View style={{ flex: 1, width: '85%' }}>
                    <Text style={styles.contentTitle}>Contact Details</Text>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Locality</Text>
                      <TextInput placeholder="Ex. Ramsagar" style={styles.input} value={values.locality}
                        onChangeText={(text) => { onChangeValue('locality', text) }} />
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>District</Text>
                      <TextInput placeholder="Ex. Bankura" style={styles.input} value={values.district}
                        onChangeText={(text) => { onChangeValue('district', text) }} />
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>State</Text>
                      <TextInput placeholder="Ex. West Bangal" style={styles.input} value={values.state}
                        onChangeText={(text) => { onChangeValue('state', text) }} />
                    </View>
                    <View style={styles.formControl}>
                      <Text style={styles.label}>Contact No.</Text>
                      <TextInput placeholder="+91-" style={styles.input} keyboardType='phone-pad' value={values.contact}
                        onChangeText={text => onChangeValue('contact', text)} />
                    </View>
                  </View>
                )}
              </Wizard.Step>

              {/* -------------------------- Upload Image -------------------------------------------------- */}

              <Wizard.Step>
                {({ handleSelectPhoto, values }) => (
                  <View style={{ flex: 1, width: '85%' }}>
                    <Text style={styles.contentTitle}>Upload Image</Text>
                    <View style={styles.formControl}>
                      <View style={[styles.uploadContainer, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        {values.image.uri ? (<View style={styles.imageContainer}>
                          {/* <Image source={Images.aqurium_1} style={styles.image}></Image> */}
                          <Image source={{ uri: values.image.uri }} style={styles.image}></Image>
                        </View>) : null}
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
                            <FontAwesome name="photo" />
                            {values.image.uri ? <Text style={styles.uploadButtonTitle}>Change Image</Text> :
                              <Text style={styles.uploadButtonTitle}>Upload a Image</Text>}
                          </TouchableOpacity>
                          <View style={{ flexWrap: 'wrap' }}>
                            {values.image.fileName ? <Text style={{ marginTop: 20 }}>{values.image.fileName}</Text> : null}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Wizard.Step>
            </Wizard>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 20,
    marginTop: 10,
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  contentTitle: {
    alignSelf: 'center',
    paddingVertical: 30,
    fontSize: 25,
    fontWeight: 'bold'
  },
  label: {
    marginVertical: 8,
    marginHorizontal: 5,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1
  },
  input: {
    paddingVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  itemPickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 0,
    borderRadius: 5
  },
  itemPicker: {
    height: 36
    // backgroundColor: '#f0f0f0',
    // paddingHorizontal: 2,
    // paddingVertical: 5,

  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dateText: {
    width: '70%',
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 20,
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
