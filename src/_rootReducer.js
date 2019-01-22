// Redux imports
import {combineReducers} from 'redux';

// Redux Persist imports
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer imports
import signInReducers from './signInScreen/reducers';

const rootPersistConfig =
{
	key: 'root',
	storage,
	whitelist: ['organizerName']
};

const rootReducer = combineReducers({
    ...signInReducers
});

export default persistReducer(rootPersistConfig, rootReducer);