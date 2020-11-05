import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
    user: null,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return { user: action.userData }
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}

export default authReducer;