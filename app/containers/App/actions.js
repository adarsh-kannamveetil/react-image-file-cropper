import {
    LOAD_USER,
    SET_USER, LOGOUT_USER,
} from './constants';

export function loadUser(user) {
  return {
    type: LOAD_USER,
    user,
  };
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function setUserAuth(user) {
  return {
    type: SET_USER,
    user,
  };
}
