import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';

import { API_URL } from '../../../apiEndpoint';
import Product from '../../models/product.model';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const getUserDetails = async (callback) => {
    const userData = await AsyncStorage.getItem('userData');
    const transformedUserData = JSON.parse(userData);
    const { jwtToken, userId } = transformedUserData;
    return callback(jwtToken, userId);
};

export const getAllProducts = (callback) => {
    let jwtToken;
    let userId;
    getUserDetails((token, uid) => {
        console.log("token: ", token);
        console.log("uid: ", uid);
        jwtToken = token;
        userId = uid;

    })

    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                // console.log('FETCHED: ', jsonData);
                let loadedProducts = [];
                jsonData.map(data => {
                    const product = new Product(
                        data._id,
                        data.userId,
                        data.username,
                        data.fisheryName,
                        data.fishName,
                        data.fishCategory,
                        data.price,
                        data.unit,
                        data.image,
                        data.location,
                        data.contact,
                        data.availableTill,
                        data.description,
                        data.createdAt,
                        data.updatedAt);
                    loadedProducts.push(product);
                })
                dispatch({
                    type: GET_PRODUCTS,
                    products: loadedProducts,
                    currentUserId: userId
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
    let payload = new FormData();
    console.log("Product Data: ", productData);
    Object.keys(productData).forEach((key) => {
        payload.append(key, productData[key]);
    });
    payload.append('image', { uri: Platform.OS === 'android' ? productData.image.uri : photo.uri.replace('file://', ''), type: productData.image.type, name: productData.image.fileName });
    // payload.append('Content-Type', productData.image.type)
    console.log('payload', payload);
    let jwtToken;
    let userId;
    getUserDetails(userInfo => {
        const { token, uid } = userInfo;
        jwtToken = token;
        userId = uid;
    });
    return dispatch => {
        fetch(`${API_URL}/product`, {
            method: 'POST',
            body: payload
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.json();
            })
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

