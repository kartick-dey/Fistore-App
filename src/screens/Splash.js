import React, { Component } from 'react';
import { View } from 'react-native';
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
        <BrandLogo></BrandLogo>
      </View>
    );
  }
}
