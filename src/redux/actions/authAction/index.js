import {
  SAVEEMAILFORUSER,
  USERLOGINDATA,
  USERLOGINTOKEN,
  USERLOGOUT,
  VERIFY_POPUP
} from '../../constants';
import store from '../../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loginUser(payload) {
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}


