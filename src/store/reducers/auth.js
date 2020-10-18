import { AUTHENTICATE } from '../actions/auth';

const initialState = {
    jwtToken: '',
    id: '',
    name: '',
    email: '',
    picture: '',
    uid: '',
    provider: ''

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                jwtToken: action.jwtToken,
                id: action.id,
                name: action.name,
                email: action.email,
                picture: action.picture,
                uid: action.uid,
                provider: action.provider
            }

        default:
            return state;
    }
}

export default authReducer;