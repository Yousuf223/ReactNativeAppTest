
import store from '../../index';
import ActionTypes, { ALL_EVENT } from '../../constants';
function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  return {
    type: 'LOADER_START',
  };
}
export function getEvent(payload) {
  return {
    type: ALL_EVENT,
    payload,
  };
}
export function loaderStartWithDispatch() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStopWithDispatch() {
  dispatch({type: 'LOADER_STOP'});
}
export function loaderStop() {
  return {
    type: 'LOADER_STOP',
  };
}
export function saveCurrentUserLocation(location) {
  return {
    type: 'SAVE_CURRENT_USER_LOCATION',
    payload: location,
  };
}
// export const getDeviceToken = async () => {
//   try {
//     // await messaging().registerDeviceForRemoteMessages();
//     const token = await messaging().getToken();
//     if (token) return token;
//     else return '';
//   } catch (error) {
//     console.log(error);
//   }
// };









export function removeDataForLogoutUser() {
  return {
    type: 'LOGOUT_AND_REMOVE_INFO',
  };
}
export const addProduct = (product) => {
  return {
    type: 'ADD_PRODUCT',
    payload: product,
  };
};

export const removeProduct = (id) => {
  return {
    type: 'REMOVE_PRODUCT',
    payload: id,
  };
};




