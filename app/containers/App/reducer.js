/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import AuthService from 'utils/AuthService';
import { isTokenExpired } from 'utils/jwtHelper';

import {
    LOAD_USER,
    SET_USER, LOGOUT_USER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  isAuthenticated: false,
  userToken: false,
  userData: {
    profile: false,
  },
});
let Auth;
Auth = new AuthService();

function getAccess() {
  const accessToken = localStorage.getItem('user_access_token');
  let profile = localStorage.getItem('user_profile');
  // noinspection JSAnnotator
  profile = profile ? JSON.parse(profile) : {};
  const isAuthenticated = !!accessToken && !isTokenExpired(accessToken);

  return {
    accessToken,
    profile,
    isAuthenticated,
  };
}
function setAccess(auth) {
  localStorage.setItem('user_access_token', auth.token ? auth.token.AccessToken : auth.user_id);
  localStorage.setItem('user_profile', JSON.stringify(auth.user));
}
function removeAccess() {
  // Auth.logout();
}


function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      const auth = getAccess();
      return state
                .set('loading', false)
                .set('error', false)
                .set('isAuthenticated', auth.isAuthenticated)
                .set('userToken', auth.accessToken)
                .setIn(['userData', 'profile'], auth.profile);

    case SET_USER:
      setAccess(action.user);
      return state
              .set('loading', false)
              .set('error', false)
              .set('isAuthenticated', true)
              .set('userToken', action.user.token.AccessToken)
              .setIn(['userData', 'profile'], action.user.user);
    case LOGOUT_USER:
      removeAccess();
      return state.clear();
    default:
      return state;
  }
}

export default appReducer;
