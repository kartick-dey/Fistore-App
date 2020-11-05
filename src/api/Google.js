import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '873279819257-m1u7hv6nv8kfjpi13bkcattasnlgi4qh.apps.googleusercontent.com',
    offlineAccess: true,
});

const loginWithGoogle = async (callback) => {
    try {
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
        // const { idToken, accessToken } = await GoogleSignin.getTokens();
        // console.log('Accestoken from Google: ', accessToken);
        return callback(null, user);
    } catch (error) {
        console.log('Error in Google Login: ', error);
        return callback(error);
    }
};

export const GoogleApi = {
    loginWithGoogle
};