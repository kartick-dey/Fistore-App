import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


import BrandLogo from '../components/brandLogo';
import * as authActions from '../store/actions/auth';

const Splash = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await AsyncStorage.getItem('userData');
      // console.log("Useradata fromAsync: ", userData);
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transforUserData = JSON.parse(userData);
      const {jwtToken, userId, expiryDate} = transforUserData;
      const expirationDate = new Date(expiryDate);
      // if (expirationDate <= new Date() || !jwtToken || !userId)
      if ( !jwtToken || !userId ) {
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('Main');
      dispatch(authActions.authenticate(transforUserData));
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
