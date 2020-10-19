import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
    jwtToken: '',
    userId: '',
    name: '',
    email: '',
    picture: '',
    uid: '',
    provider: '',
    expiryDate: Date,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                jwtToken: action.jwtToken,
                userId: action.userId,
                name: action.name,
                email: action.email,
                picture: action.picture,
                uid: action.uid,
                provider: action.provider,
                expiryDate: action.expiryDate,
            }
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}

export default authReducer;