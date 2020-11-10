import AsyncStorage from '@react-native-community/async-storage';

export const keys = {
    userId: 'userId'
}; 

const setAsyncStorage = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.log("AsyncStorage setter error: ", error);
    }
};

const getAsyncStorage = async (key) => {
    try {
       const value = await AsyncStorage.getItem(key);
       if (value) {
           return value;
       } else {
           return null
       }
    } catch (error) {
        console.log("AsyncStorage getter error: ", error);
        return null
    }
};

const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log("AsyncStorage getter error: ", error);
    }
};

export { setAsyncStorage, getAsyncStorage, clearAsyncStorage };