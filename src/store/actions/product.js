import AsyncStorage from '@react-native-community/async-storage';

import {API_URL} from '../../../apiEndpoint';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const transformedUserData = JSON.parse(userData);
    const { jwtToken, userId} = transformedUserData;
    return { jwtToken, userId };
};

export const getAllProducts = (callback) => {
    const { jwtToken, userId } = getUserDetails();

    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('FETCHED: ', jsonData);
                dispatch({
                    type: GET_PRODUCTS,
                    products: jsonData,
                    userId: userId
                });
                return callback(null, 'FETCHED');
            })
            .catch(error => {
                console.log("Error while getting all product: ", error);
                return callback(error);
            })
    }
}

export const createProduct = (productData, callback) => {
    const { jwtToken, userId } = getUserDetails();
    productData.append('userId', userId);

    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            },
            body: productData
        })
            .then(response => response.json())
            .then(jsonData => {
                dispatch({
                    type: CREATE_PRODUCT,
                    product: jsonData
                });
                return callback(null, jsonData);
            })
            .catch(error => {
                console.log("Error while creating a product: ", error);
                return callback(error);
            })
    }
} 

