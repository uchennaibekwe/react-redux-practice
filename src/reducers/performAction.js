import { USER_INPUT } from '../actions/action_types';

const user_input = {
    val: 'initial'
}

const performAction = (state = user_input, action) => {
    switch(action.type) {
        case USER_INPUT:
            return {
                ...state,
                val: action.payload.input
            }
        default:
            return state
    }
}

export default performAction;