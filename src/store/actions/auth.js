import { AsyncStorage } from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE';

// const API_URL = 'http://localhost:3000/api/v1.0/user'
const API_URL = 'http://34.217.37.7:3000/api/v1.0/user';
// const GET_USER_API_URL = 'http://34.217.37.7:3000/api/v1.0/user/me'

const getUserInfo = (jwtToken, callback) => {
    fetch(`${API_URL}/me`, {
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

export const authenticate = (provider, token, callback) => {
    return async dispatch => {
        fetch(API_URL, {
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
                        dispatch({
                            type: AUTHENTICATE,
                            jwtToken: jsonData.jwtToken,
                            id: result._id,
                            name: result.name,
                            email: result.email,
                            picture: result.picture,
                            uid: result.provider.uid,
                            provider: result.provider.type
                        });
                        saveToStorage(jsonData.jwtToken, result);
                        return callback(null, 'Done');

                    }
                });
            })
            .catch(error => {
                console.log("error in dispatch: ", error);
                return callback(error);
                // throw error;
            });
    };
}

const saveToStorage = (jwtToken, userdata) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        jwtToken: jwtToken,
        id: userdata._id,
        name: userdata.name,
        email: userdata.email,
        picture: userdata.picture,
        uid: userdata.provider.uid,
        provider: userdata.provider.type
    }))
}