import rootReducer from '../redux/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTransform } from 'redux-persist';
import { stringify, parse } from 'flatted';

// Custom transformation for circular structures
const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformCircular],
  blacklist: ['loader'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


let store = createStore(persistedReducer);

export let persistor = persistStore(store);

export default store;
