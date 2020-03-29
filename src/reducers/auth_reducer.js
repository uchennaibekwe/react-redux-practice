import { LOGIN_SUCCESS, LOGIN_FAILURE, ADD_PROFILE, REMOVE_PROFILE } from '../actions/action_types';

const initialState = {
    is_authenticated: false,
    profile: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                is_authenticated: true
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                is_authenticated: false
            }
        case ADD_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case REMOVE_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}

export default AuthReducer;