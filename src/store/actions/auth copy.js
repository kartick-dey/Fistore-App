// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

import {API_URL} from '../../../apiEndpoint';

console.log('API_URL: ', API_URL);

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userData) => {
    console.log("9");
    return {
        type: AUTHENTICATE,
        jwtToken: userData.jwtToken,
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        providerUid: userData.providerUid,
        provider: userData.provider,
        expiryDate: userData.expiryDate,
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

export const login = (provider, token, callback) => {
    return dispatch => {
        fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                provider: provider
            })
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('ResData: ', jsonData);
                getUserInfo(jsonData.jwtToken, (error, result) => {
                    if (error) {
                        console.log("Error while fetching user data: ", error);
                        return callback(error);
                        // throw error;
                    } else {
                        console.log("User Info: ", result);
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                        dispatch({
                            type: AUTHENTICATE,
                            jwtToken: jsonData.jwtToken,
                            userId: result._id,
                            name: result.name,
                            email: result.email,
                            picture: result.picture,
                            providerUid: result.providerUid,
                            provider: result.provider,
                            expiryDate: expirationDate,
                        });
                        saveToStorage(jsonData.jwtToken, result, expirationDate);
                        return callback(null, 'DONE');

                    }
                });
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

const saveToStorage = (jwtToken, userdata, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        jwtToken: jwtToken,
        userId: userdata._id,
        name: userdata.name,
        email: userdata.email,
        picture: userdata.picture,
        providerUid: userdata.providerUid,
        provider: userdata.provider,
        expiryDate: expirationDate.toISOString(),
    }));
}