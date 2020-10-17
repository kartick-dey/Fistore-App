import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Images from '../constants/images';

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
    }, 1000);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.logoContainer}>
          <View style={{ flex: 1 }}>
          <Image source={Images.logo} style={styles.brandLogo} />
          </View>
        </View>
        <Text style={styles.brandName}> F<Text style={{ color: '#c21616'}}>!</Text><Text>STORE</Text> </Text>
        <Text style={{ fontWeight: 'bold', color: '#a0a0a0' }}>Connect with everyone</Text>
      </View>
    );
  }
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  logoContainer: {
    width: height_logo,
    height: height_logo,
    backgroundColor: 'red',
    borderRadius: 100
  },
  brandLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  brandName: {
    marginVertical: 5,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
