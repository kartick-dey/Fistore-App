import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import BrandLogo from '../commons/brandLogo';
import LoginButton from '../commons/loginButton';

export default class Login extends Component {
  constructor(props) {
    // console.log('Login: ', props);
    super(props);
    this.state = {};
  }

  onGooglePress() {
    GoogleApi.loginWithGoogle((error, accessToken) => {
      if (error) {
        console.log("Error in Google: ", error);
        return;
      }
      console.log("AccessToken: ", accessToken);
    })
  }
  onFacebookPress = () => {
    FacebookApi.loginWithFacebook((error, accessToken) => {
      if (error) {
        console.log('Error in FB: ', error);
        return;
      }
      console.log("AccessToken: ", accessToken);
    });
  }

  render() {
    const bgGoogleButton = '#DB4437';
    const bgFacebookButton = '#3b5998';
    return (
      <View style={styles.loginContainer}>
        <View style={styles.brandContainer}>
          <BrandLogo></BrandLogo>
        </View>
        <View style={[styles.loginButtonContainer]}>
          <View>
            <LoginButton onPress={this.onGooglePress} bgColor={bgGoogleButton} iconName='google-plus' type="Google"></LoginButton>
            <LoginButton onPress={this.onFacebookPress} bgColor={bgFacebookButton} iconName='facebook' type="Facebook"></LoginButton>
          </View>
        </View>
      </View>
    );
  }
}

const { height } = Dimensions.get("screen");
const width = height * 0.25;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  brandContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  loginButtonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    width: '100%'
  }
});
