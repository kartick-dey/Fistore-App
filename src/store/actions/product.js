import AsyncStorage from '@react-native-community/async-storage';

import API_URL from '../../../apiEndpoint';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const getJwtToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const transformedUserData = JSON.parse(userData);
    const jwtToken = transformedUserData.jwtToken;
    return jwtToken;
};

export const getAllProducts = (callback) => {
    const jwtToken = getJwtToken();

    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                dispatch({
                    type: GET_PRODUCTS,
                    products: jsonData
                });
                return callback(null, 'FETCHED');
            })
            .catch(error => {
                console.log("Error while getting all product: ", error);
                return callback(error);
            })
    }
}

export const createProduct = async (productData, callback) => {
    const jwtToken = getJwtToken();

    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(jsonData => {
                dispatch({
                    type: CREATE_PRODUCT,
                    products: jsonData
                });
                return callback(null, 'CREAT+ED');
            })
            .catch(error => {
                console.log("Error while creating a product: ", error);
                return callback(error);
            })
    }
} 

