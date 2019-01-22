// Redux imports
import {combineReducers} from 'redux';

// Redux Persist imports
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer imports
import loadingReducers from './loadingScreen/reducers';
import signInReducers from './signInScreen/reducers';

const rootPersistConfig =
{
	key: 'root',
	storage,
	whitelist: ['organizerName']
};

const rootReducer = combineReducers({
	...loadingReducers,
	...signInReducers
});

export default persistReducer(rootPersistConfig, rootReducer);