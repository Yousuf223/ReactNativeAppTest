import {combineReducers} from '@reduxjs/toolkit';
import {authApi} from '../Api/authApiSlice';
import {resetApi} from '../Api/resetPassApiSlice';
import authReducer from './slices/authSlice';
import {profileApi} from '../Api/profileApiSlice';
import {vehicleApi} from '../Api/vehiclesApiSlice';
import {contactUsApi} from '../Api/feedbackApiSlice';
import {workerApi} from '../Api/workerApiSlice';
import {storeApi} from '../Api/storeApiSlice';
import {gasApi} from '../Api/gasApiSlice';
import {accidentApi} from '../Api/accidentApiSlice';
import {travelApi} from '../Api/travelApiSlice';
import {mechanicApi} from '../Api/mechanicApiSlice';
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
export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [resetApi.reducerPath]: resetApi.reducer,
  auth: authReducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [contactUsApi.reducerPath]: contactUsApi.reducer,
  [workerApi.reducerPath]: workerApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [gasApi.reducerPath]: gasApi.reducer,
  [accidentApi.reducerPath]: accidentApi.reducer,
  [travelApi.reducerPath]: travelApi.reducer,
  [mechanicApi.reducerPath]: mechanicApi.reducer,
  [autopartsApi.reducerPath]: autopartsApi.reducer,
  [repairAutopartsApi.reducerPath]: repairAutopartsApi.reducer,
  [maintenanceAutopartsApi.reducerPath]: maintenanceAutopartsApi.reducer,
  [equipmentApi.reducerPath]: equipmentApi.reducer,
  [petApi.reducerPath]: petApi.reducer,
  [vetApi.reducerPath]: vetApi.reducer,
  [otherRecordsApi.reducerPath]: otherRecordsApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [customRecordsApi.reducerPath]: customRecordsApi.reducer,
  [draftsApi.reducerPath]: draftsApi.reducer,
  [vehicleTypesApi.reducerPath]: vehicleTypesApi.reducer,
});
