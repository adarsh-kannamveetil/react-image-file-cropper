/**
 * 1. sets up auth library and waits for auth token
 * 2. gets user profile
 */

import { call, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { setUser } from 'containers/User/actions';
// import { loginCallback, getProfile } from './lib';
import { setAuth } from '../../components/Header/actions';
import { SET_AUTH } from '../../components/Header/constants';
// import { setUserAuth } from '../App/actions';


function* loginCallbackSaga() {
  console.log('Im here dude');
  try {
    const state = yield select((state) => state);
    console.log(state.toJS());

    console.log('Im here dude');
    return 'h';
  } catch (err) {
    // TODO display error to user
    return '/';
  }
}
function loginCallbackSaga2() {
  console.log(2133);
  return 'coool';
}

function* init() {
  yield take(setAuth().type);
  const nextPathname = yield call(loginCallbackSaga2);
  console.log(nextPathname);
}

export default [
  init,
];
