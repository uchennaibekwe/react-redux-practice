import * as action_types from './action_types';

export const SUCCESS = {
    type: action_types.SUCCESS
}

export const FAILURE = {
    type: action_types.FAILURE
}

export const performAction = (input) => {
    return {
        type: action_types.USER_INPUT,
        payload: {
            input: input
        }
    }
}

export const login_success = () => {
    return {
        type: action_types.LOGIN_SUCCESS,
    }
}

export const login_failure = () => {
    return {
        type: action_types.LOGIN_FAILURE,
    }
}

export const add_profile = (profile) => {
    return {
        type: action_types.ADD_PROFILE,
        payload: profile
    }
}

export const remove_profile = () => {
    return {
        type: action_types.REMOVE_PROFILE
    }
}
