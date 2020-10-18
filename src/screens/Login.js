import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import BrandLogo from '../commons/brandLogo';
import LoginButton from '../commons/loginButton';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const Login = (props) => {
  console.log('Props: ', props);
  const [isLoading, setIsLoading] = useState(false);

  const bgGoogleButton = '#DB4437';
  const bgFacebookButton = '#3b5998';

  const dispatch = useDispatch();

  const authenticationHandler = async (token, provider) => {
    try {
      dispatch(authActions.authenticate(token, provider, (error, result) => {
        if (error) {
          setIsLoading(false);
          throw error
        }
        props.navigation.navigate('Splash');
        // setIsLoading(false);
      }));
    } catch (error) {
      console.log('Error while calling backend API')
    }
  }

  const onGooglePress = () => {
    setIsLoading(true);
    GoogleApi.loginWithGoogle((error, accessToken) => {
      if (error) {
        console.log("Error in Google: ", error);
        alert('Please check data connection');
        setIsLoading(false);
        return;
      }
      console.log("AccessToken: ", accessToken);
      authenticationHandler('GOOGLE', accessToken);
      // setIsLoading(false);
    })
  }
  const onFacebookPress = () => {
    setIsLoading(true);
    FacebookApi.loginWithFacebook((error, accessToken) => {
      if (error) {
        console.log('Error in FB: ', error);
        alert('Please check data connection');
        setIsLoading(false);
        return;
      }
      console.log("AccessToken: ", accessToken);
      authenticationHandler('FACEBOOK', accessToken);
      // setIsLoading(false);
    });
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.brandContainer}>
        <BrandLogo></BrandLogo>
      </View>
      <View style={[styles.loginButtonContainer]}>
        { isLoading ? (<ActivityIndicator size="large" color="red" style={{ opacity: 1, marginTop: 20}}></ActivityIndicator> ):
          (<View>
            <LoginButton onPress={onGooglePress} bgColor={bgGoogleButton} iconName='google-plus' type="Google"></LoginButton>
            <LoginButton onPress={onFacebookPress} bgColor={bgFacebookButton} iconName='facebook' type="Facebook"></LoginButton>
          </View>)}
      </View>
    </View>
  );
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    width: '100%'
  }
});

export default Login;
