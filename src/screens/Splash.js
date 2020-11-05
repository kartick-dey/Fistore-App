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
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transforUserData = JSON.parse(userData);
      console.log("AsyncStorage data: ", transforUserData);
      const {userId} = transforUserData;
      if ( !userId ) {
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('Main');
      dispatch(authActions.authenticate(transforUserData));
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
