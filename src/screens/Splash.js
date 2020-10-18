import React, { Component, useEffect } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import BrandLogo from '../commons/brandLogo';

export default class Splash extends Component {
  constructor(props) {
    // console.log('Splash: ', props);
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    setTimeout(() => {
        this.props.navigation.navigate('Login');
    }, 2000);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
        <BrandLogo></BrandLogo>
      </View>
    );
  }
}
