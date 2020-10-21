import { GET_PRODUCTS } from '../actions/product';

const initialState = {
    products: [],
    userProducts: [],
    savedProducts: []

};

const getUserId = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const transformedUserData = JSON.parse(userData);
    const userId = transformedUserData.userId;
    return userId;
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            const userId = getUserId();
            return {
                products: action.products,
                userProducts: action.products.filter(product => product.userId === userId)
            }
        default:
            return state;
    }
}

export default productReducer;