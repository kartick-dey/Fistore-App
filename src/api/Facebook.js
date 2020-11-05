import {AccessToken, LoginManager} from 'react-native-fbsdk';

const permissions = ['public_profile', 'email'];
const FIELDS = 'name,email,picture';

const BASE_URL = `https://graph.facebook.com/v8.0/me?fields=${FIELDS}`;

const getUserInfo= (accessToken, callback) => {
    fetch(`${BASE_URL}&access_token=${accessToken}&debug=all`)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error))
};

const loginWithFacebook = (callback) => {
    LoginManager.logInWithPermissions(permissions)
    .then(result => {
        if (result.isCancelled) {
            console.log("Login Cancelled");
            return callback("Login Cancelled")
            // Promise.reject('Login Cancelled')
        } else {
            console.log('Login Successful');
            console.log("Login Result : ", result);
            console.log("Login success with permission: ", result.grantedPermissions.toString());
            AccessToken.getCurrentAccessToken()
            .then(data => {
                console.log("Access token result: ", data);
                const { accessToken } = data;
                getUserInfo(accessToken, (error, userInfo) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, userInfo);
                });
                // return callback(null, accessToken);
                // return Promise.resolve(accessToken);
            })
        }
    })
    .catch(error => {
        console.log("Error in facebook login: ", error);
        return callback("Error in facebook login")
    });
};

export const FacebookApi = {
    loginWithFacebook
};