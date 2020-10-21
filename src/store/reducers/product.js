import { GET_PRODUCTS } from '../actions/product';

const initialState = {
    products: [],
    savedProducts: []

};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                products: action.products
            }
        default:
            return state;
    }
}

export default productReducer;