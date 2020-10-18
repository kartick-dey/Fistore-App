import { GoogleSignin } from '@react-native-community/google-signin';
import { call } from 'react-native-reanimated';

GoogleSignin.configure({
    webClientId: '365903936294-4va1m6asl0gh126i8ed7mer1r7cnfkne.apps.googleusercontent.com',
    offlineAccess: true,
});

const loginWithGoogle = async (callback) => {
    try {
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
        const { idToken, accessToken } = await GoogleSignin.getTokens();
        console.log('Accestoken from Google: ', accessToken);
        return callback(null, accessToken);
    } catch (error) {
        console.log('Error in Google Login: ', error);
        return callback(error);
    }
};

export const GoogleApi = {
    loginWithGoogle
};