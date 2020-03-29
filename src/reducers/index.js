import { combineReducers } from 'redux';

import reducer1 from './reducer1';
import performAction from './performAction';
import auth_reducer from './auth_reducer';

const rootReducer = combineReducers({
    reducer1,
    performAction,
    auth_reducer
});

export default rootReducer;