import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import BrandLogo from '../commons/brandLogo';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as authActions from '../store/actions/auth';

const Splash = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      console.log('1');
      const userData = await AsyncStorage.getItem('userData');
      console.log("2");
      console.log("Useradata fromAsync: ", userData);
      console.log("3");
      if (!userData) {
        console.log("4");
        props.navigation.navigate('Auth');
        return;
      }
      console.log("5");
      const transforUserData = JSON.parse(userData);
      const {jwtToken, userId, expiryDate} = transforUserData;
      const expirationDate = new Date(expiryDate);
      console.log("6");
  
      if (expirationDate <= new Date() || !jwtToken || !userId) {
        console.log("7");
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('Main');
      console.log("8");
      dispatch(authActions.authenticate(transforUserData));
      console.log("10 ");     
      // setTimeout(() => {
      //     this.props.navigation.navigate('Auth');
      // }, 2000);
    };

    checkAuth();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <ActivityIndicator size="large" color="red"></ActivityIndicator> */}
      <BrandLogo></BrandLogo>
    </View>
  );
};

export default Splash;
