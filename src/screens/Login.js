import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert, TextInput, Text } from 'react-native';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import * as authActions from '../store/actions/auth';
import LoginButton from '../components/loginButton';
import BrandLogo from '../components/brandLogo';
import colors from '../constants/colors';
import Wizard from '../components/loginWizard';
import BuildUserInfo from '../models/buildUserData';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLogin, setIsSocialLogin] = useState(true);
  const [isSocialLoginMode, setIsSocialLoginMode] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState(0);

  const bgGoogleButton = colors.primary; // '#DB4437'
  const bgFacebookButton = '#3b5998';
  const initialValues = {
    phoneNumber: '',
    code: '',
    name: '',
    email: '',
    fisheryName: '',
    providerUid: ''
  };


  const dispatch = useDispatch();

  const authenticationHandler = async (provider, userData) => {
    try {
      const user = BuildUserInfo(userData, provider);
      console.log("Build User: ", user);
      dispatch(authActions.login(user, (error, result) => {
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

  const signInWithPhone = async (userData) => {
    authenticationHandler('PHONE', userData);
  };

  const onGooglePress = () => {
    setIsLoading(true);
    GoogleApi.loginWithGoogle((error, userData) => {
      if (error) {
        console.log("Error in Google: ", error);
        alert('Please check data connection');
        setIsLoading(false);
        return;
      }
      console.log("userData: ", userData);
      authenticationHandler('GOOGLE', userData);
      // setIsLoading(false);
    })
  }
  const onFacebookPress = () => {
    setIsLoading(true);
    FacebookApi.loginWithFacebook((error, userData) => {
      if (error) {
        console.log('Error in FB: ', error);
        alert('Please check data connection');
        setIsLoading(false);
        return;
      }
      console.log("userData: ", userData);
      authenticationHandler('FACEBOOK', userData);
      // setIsLoading(false);
    });
  };

  const isVisibleSocialLogin = (value) => {
    console.log('Value: ', value);
    if (value === 0) {
      setIsSocialLogin(true);
    }
    else {
      setIsSocialLogin(false);
    }
  };

  const setIsLoadingState = (value) => {
    setIsLoading(value);
  }

  return (
    <View style={styles.loginContainer}>
      <View style={[styles.brandContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <View>
          <BrandLogo></BrandLogo>
        </View>
      </View>
      {isLoading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="red" style={{ opacity: 1, marginTop: 20, alignSelf: 'center' }}></ActivityIndicator>
      </View>) : <View style={{ flex: 2, width: '100%' }}>
          <View style={{ flex: 1, width: '100%' }}>
            <Wizard
              initialValues={initialValues}
              onSubmit={signInWithPhone}
              socialLogin={isVisibleSocialLogin}
              setIsLoading={() => setIsSocialLoginMode(!isSocialLoginMode)}>
              <Wizard.Step>
                {({ changeValue, values }) => (
                  <View style={{ paddingVertical: 10 }}>
                    <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, color: colors.textColor }}>Enter Phone Number</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.prefixTextContainer}>
                        <Text style={styles.prefixText}>+91</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <TextInput onChangeText={(number) => changeValue('phoneNumber', number)} value={values.phoneNumber}
                          placeholder="8170990726" keyboardType='phone-pad' style={styles.input} />
                      </View>
                    </View>
                  </View>
                )}
              </Wizard.Step>
              <Wizard.Step>
                {({ changeValue }) => (
                  <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, color: colors.textColor }}>Enter OTP below</Text>
                    </View>
                    <View style={{ paddingVertical: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <View style={styles.inputContainer}>
                        <View style={{ flex: 1 }}>
                          <TextInput onChangeText={(otp) => changeValue('code', otp)}
                            placeholder="Enter OTP" keyboardType='number-pad' style={styles.input} />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Wizard.Step>
              <Wizard.Step>
                {({ changeValue, values }) => (
                  <View style={{ paddingVertical: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <TextInput onChangeText={(name) => changeValue('name', name)}
                          placeholder="Your Name" autoCapitalize="words" autoCorrect={false} style={styles.input} />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <TextInput onChangeText={(email) => changeValue('email', email)}
                          placeholder="E-mail" keyboardType="email-address" autoCorrect={false} style={styles.input} />
                      </View>
                    </View>
                    {/* <View style={styles.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <TextInput onChangeText={() => { }}
                          placeholder="Your company name" autoCapitalize="words" autoCorrect={false} style={styles.input} />
                      </View>
                    </View> */}
                  </View>
                )}
              </Wizard.Step>
            </Wizard>
          </View>
          {isSocialLogin ?
            <View style={[styles.socialLoginContainer]}>
              <View style={{ paddingHorizontal: 0 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>OR</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <LoginButton
                  isLoading={isSocialLoginMode}
                  onPress={onGooglePress}
                  bgColor={bgGoogleButton}
                  iconName='google-plus'
                  type="Google"></LoginButton>
                <LoginButton
                  isLoading={isSocialLoginMode}
                  onPress={onFacebookPress}
                  bgColor={bgFacebookButton}
                  iconName='facebook'
                  type="Facebook"></LoginButton>
              </View>
            </View> : null}
        </View>}
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
    width: '62%',
    flexDirection: 'row',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: colors.liner,
    marginVertical: 3
    // elevation: 1
  },
  prefixTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRightColor: '#ccc',
    borderRightWidth: 1
  },
  prefixText: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 18
  },
  input: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    letterSpacing: 1,
    fontSize: 18
  },
  socialLoginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    width: '100%'
  }
});

export default Login;
