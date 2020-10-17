import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';


// Error due to no internet - Error in FB login:  CONNECTION_FAILURE: CONNECTION_FAILURE / Error in Google Signin:  NETWORK_ERROR
GoogleSignin.configure({
  webClientId: '365903936294-4va1m6asl0gh126i8ed7mer1r7cnfkne.apps.googleusercontent.com',
  offlineAccess: true,
  // forceCodeForRefreshToken: true,
});

const userInfo = {
  name: '',
  id: '',
  email: '',
  loggedIn: '',
  photo: '',
  provider: ''
};

export default class Login extends Component {
  constructor(props) {
    // console.log('Login: ', props);
    super(props);
    this.state = {
      userInfo: {
        name: '',
        id: '',
        email: '',
        loggedIn: false,
        photo: '',
        provider: ''
      },
      loaded: false
    };
  }

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      console.log('IdToken: ', idToken);
      console.log('Access_Token: ', accessToken);
      // const user = await GoogleSignin.signIn();
      // console.log('Google login Result: ', user);
      // userInfo.name = user.user.name;
      // userInfo.id = user.user.id;
      // userInfo.email = user.user.email;
      // userInfo.photo = user.user.photo;
      // userInfo.loggedIn = true;
      // this.setState({
      //   userInfo: {
      //     name: user.user.name,
      //     id: user.user.id,
      //     email: user.user.email,
      //     loggedIn: true,
      //     photo: user.user.photo,
      //   },
      //   loaded: true
      // });
      // console.log('UserInfo: ', this.state.userInfo);
    } catch (error) {
      console.log('Error in Google Signin: ', error.message);
    }
  };

  facebookSignIn = (token) => {
    fetch('https://graph.facebook.com/me?fields=email,name,picture&access_token=' + token)
      .then((response) => response.json())
      .then(user => {
        console.log('User from FB API call: ', user);
        userInfo.name = user.name;
        userInfo.id = user.id;
        userInfo.email = user.email;
        userInfo.loggedIn = true;
        userInfo.avatar = user.picture;
        this.setState({
          userInfo: {
            name: user.name,
            id: user.id,
            email: user.email,
            loggedIn: true,
            photo: user.picture.data.url,
          },
          loaded: true
        });
        console.log('UserInfo: ', this.state.userInfo);
      })
      .catch((error) => {
        console.log('ERROR GETTING DATA FROM FACEBOOK: ', error)
      })
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error from FB: ', error);
    } else {
      console.log('Result from FB: ', result);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        { this.state.loaded ?
          <View style={{ alignContent: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text>{this.state.userInfo.name}</Text>
            <Text>{this.state.userInfo.email}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.userInfo.photo }}></Image>
          </View>
          : <View>
            <Text>Not signedin!</Text>
          </View>}
          <Button title="Google" style={{ flex: 1 , color: "red", backgroudColor: 'white'}} onPress={this.googleSignIn}></Button>
        <GoogleSigninButton
          onPress={this.googleSignIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          style={{ width: 300, height: 50 }}
        ></GoogleSigninButton>
        <LoginButton
          style={{ width: 290, height: 40, justifyContent: 'center', alignContent: 'center' }}
          publishPermissions={['publish_actions']}
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('Error in FB login: ', error)
            } else {
              if (result.isCancelled) {
                console.log('Login cancelled!')
              } else {
                console.log('Login successfull!')
                console.log('Login successfull!: ', result)
                AccessToken.getCurrentAccessToken().then((data) => {
                  console.log('FB login Result: ', data);
                  const { accessToken } = data;
                  console.log('FB login accessToken: ', accessToken);
                  this.facebookSignIn(accessToken);
                  // const infoRequest = new GraphRequest(
                  //   '/me?fields=name,email,picture',
                  //   null,
                  //   this._responseInfoCallback
                  // );
                  // // Start the graph request.
                  // new GraphRequestManager().addRequest(infoRequest).start();
                })
                  .catch(error => console.log('Error in getting user info From FB: ', error));
              }
            }
          }}
          onLogoutFinished={() => {
            console.log('Logout')
          }}
        ></LoginButton>
      </View>
    );
  }
}
