// Redux imports
import {combineReducers} from 'redux';

// Redux Persist imports
// import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Reducer imports
import signInReducers from './signInScreen/reducers';

const rootReducer = combineReducers({
    ...signInReducers
});

export default rootReducer;