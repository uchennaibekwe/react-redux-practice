import * as action_types from '../actions/action_types';

const initialState = {
    stateprop1: false
}

const reducer1 = (state = initialState, action) => {
    switch(action.type) {
        case action_types.SUCCESS:
            return {
                ...state,
                stateprop1: true
            }
        case action_types.FAILURE:
            return {
                ...state,
                stateprop1: false
            }
        default:
            return state
    }
}

export default reducer1;