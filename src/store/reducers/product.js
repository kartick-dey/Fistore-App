import { GET_PRODUCTS, CREATE_PRODUCT } from '../actions/product';

const initialState = {
    products: [],
    userProducts: [],
    savedProducts: []

};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            // console.log("action.currentUserId: ", action.currentUserId);
            return {
                products: action.products,
                userProducts: action.products.filter(product => product.userId === action.currentUserId)
            }
        default:
            return state;
    }
}

export default productReducer;