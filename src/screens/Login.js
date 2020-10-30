import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert, TextInput, Text } from 'react-native';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import LoginButton from '../components/loginButton';
import BrandLogo from '../components/brandLogo';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [confirm, setConfirm] = useState();

  const bgGoogleButton = '#DB4437';
  const bgFacebookButton = '#3b5998';
  const bgPhoneButton = colors.primary;

  const dispatch = useDispatch();

  const authenticationHandler = async (token, provider) => {
    try {
      dispatch(authActions.login(token, provider, (error, result) => {
        if (error) {
          setIsLoading(false);
          alert(error);
          return;
        }
        props.navigation.navigate('Main');
        setIsLoading(false);
      }));
    } catch (error) {
      console.log('Error while calling backend API')
    }
  };

  const signInWithPhone = async () => {
    if (phoneNumber.length !== 10) {
      alert("Invalid phone number");
      return;
    }
    // const number = Number(phoneNumber);
    // console.log("Phone number: ", typeof(number));
    // alert(`Phone sign in ${phoneNumber}`);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('Confirmation : ', confirmation);
  };

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
      {isLoading ? (<ActivityIndicator size="large" color="red" style={{ opacity: 1, marginTop: 20 }}></ActivityIndicator>) :
        (<View style={[styles.loginButtonContainer]}>
          <View>
            <View style={{ paddingVertical: 20 }}>
              <View style={styles.inputContainer}>
                <View style={styles.prefixTextContainer}>
                  <Text style={styles.prefixText}>+91</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput onChangeText={(number) => setPhoneNumber(number)}
                  placeholder="Enter Phone Number" keyboardType='phone-pad' style={styles.input} />
                </View>
              </View>
            </View>
            <LoginButton onPress={signInWithPhone} bgColor={bgPhoneButton} iconName='phone-square-alt' type="Phone"></LoginButton>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <Text style={{ alignSelf: 'center' }}>------------------------OR---------------------------</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <LoginButton onPress={onGooglePress} bgColor={bgGoogleButton} iconName='google-plus' type="Google"></LoginButton>
            <LoginButton onPress={onFacebookPress} bgColor={bgFacebookButton} iconName='facebook' type="Facebook"></LoginButton>
          </View>
        </View>)}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.liner
  },
  prefixTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRightColor: colors.liner,
    borderRightWidth: 0.5
  },
  prefixText: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 20
  },
  input: {
    width: '100%',
    paddingVertical: 7,
    paddingHorizontal: 15,
    letterSpacing: 1,
    fontSize: 20
  },
  loginButtonContainer: {
    flex: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    width: '100%'
  }
});

export default Login;
