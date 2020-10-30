import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '365903936294-2ld7dn07f57i749ve7mkndsin2uldtcg.apps.googleusercontent.com',
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