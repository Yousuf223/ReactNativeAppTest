import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {authApi} from '../Api/authApiSlice';
import {resetApi} from '../Api/resetPassApiSlice';
import {reduxStorage} from './mmkv';
import {rootReducer} from './rootReducer';
import {profileApi} from '../Api/profileApiSlice';
import {vehicleApi} from '../Api/vehiclesApiSlice';
import {contactUsApi} from '../Api/feedbackApiSlice';
import {workerApi} from '../Api/workerApiSlice';
import {storeApi} from '../Api/storeApiSlice';
import {mechanicApi} from '../Api/mechanicApiSlice';
import {gasApi} from '../Api/gasApiSlice';
import {accidentApi} from '../Api/accidentApiSlice';
import {travelApi} from '../Api/travelApiSlice';
import {autopartsApi} from '../Api/autopartsApiSlice';
import {repairAutopartsApi} from '../Api/repairAutopartsApiSlice';
import {maintenanceAutopartsApi} from '../Api/mainteinanceAutopartsApiSlice';
import {equipmentApi} from '../Api/equipmentApiSlice';
import {petApi} from '../Api/petApiSlice';
import {vetApi} from '../Api/vetApiSlice';
import {otherRecordsApi} from '../Api/otherRecordsApiSlice';
import {recordsApi} from '../Api/recordsApiSlice';
import {paymentApi} from '../Api/paymentApiSlice';
import {categoryApi} from '../Api/categoryApiSlice';
import {customRecordsApi} from '../Api/customRecordsApiSlice';
import {draftsApi} from '../Api/draftsApiSlice';
import {vehicleTypesApi} from '../Api/vehicleTypesApiSlice';
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // whitelist: ['auth'], // Only persist specific reducers
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      resetApi.middleware,
      profileApi.middleware,
      vehicleApi.middleware,
      contactUsApi.middleware,
      workerApi.middleware,
      storeApi.middleware,
      mechanicApi.middleware,
      gasApi.middleware,
      accidentApi.middleware,
      travelApi.middleware,
      autopartsApi.middleware,
      repairAutopartsApi.middleware,
      maintenanceAutopartsApi.middleware,
      equipmentApi.middleware,
      petApi.middleware,
      vetApi.middleware,
      otherRecordsApi.middleware,
      recordsApi.middleware,
      paymentApi.middleware,
      categoryApi.middleware,
      customRecordsApi.middleware,
      draftsApi.middleware,
      vehicleTypesApi.middleware,
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
