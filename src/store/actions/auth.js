// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import { API_URL } from '../../../apiEndpoint';

console.log('API_URL: ', API_URL);

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userData) => {
    return {
        type: AUTHENTICATE,
        userData: userData
    };
}

const getUserInfo = (jwtToken, callback) => {
    fetch(`${API_URL}/user/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
        .then(response => response.json())
        .then(json => {
            return callback(null, json);
        })
        .catch(error => callback(error));
}

export const login = (userData, callback) => {
    return dispatch => {
        fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('ResData: ', jsonData);
                dispatch({
                    type: AUTHENTICATE,
                    userData: jsonData.user
                });
                saveToStorage(jsonData.user);
                return callback(null, 'DONE');
            })
            .catch(error => {
                console.log("error in dispatch: ", error);
                return callback(error);
                // throw error;
            });
    };
};

const socialSignout = async (provider, callback) => {
    if (provider === 'GOOGLE') {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            return callback(null, 'SIGNOUT');
        } catch (error) {
            console.log("Error in Google logout: ", error);
            return callback(error);
        }
    }
    if (provider === 'FACEBOOK') {
        LoginManager.logOut();
        return callback(null, 'SIGNOUT');
    }
    if (provider === 'PHONE') {
        await auth().signOut();
        return callback(null, 'SIGNOUT')
    }
};

export const logout = (callback) => {
    return async dispatch => {
        const userData = await AsyncStorage.getItem('userData');
        const tranformedData = JSON.parse(userData);
        socialSignout(tranformedData.provider, (error, result) => {
            if (error) {
                console.log("Error while signout");
                return callback('Logout failed');
            }
            AsyncStorage.removeItem('userData');
            dispatch({ type: LOGOUT });
            return callback(null, "Loggedout");
        });
    }
};

const saveToStorage = (userdata) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        userId: userdata._id,
        name: userdata.name,
        fisheryName: userdata.fisheryName,
        phone: userdata.phone,
        email: userdata.email,
        picture: userdata.picture,
        providerUid: userdata.providerUid,
        provider: userdata.provider,
    }));
}