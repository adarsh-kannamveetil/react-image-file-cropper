import auth0 from 'auth0-js';
import { browserHistory } from 'react-router';
import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
// import { AUTH_SECRET, AUTH_TOKEN } from '../containers/User/constants';


export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
        // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: 'kxRpmf2BaKlw1txLfC7iBu7yglcLHv8l',
      domain: 'test-embroidery-digitizer.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/login/callback',
    });

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(username, password) {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
    }, (err, authResult) => {
      if (err) {
        alert(`Error: ${err.description}`);
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setToken(authResult.accessToken, authResult.idToken);
        browserHistory.replace('/home');
      }
    });
  }

  signup(email, password) {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      if (err) {
        alert(`Error: ${err.description}`);
      }
    });
  }

  loginWithGoogle() {
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }
  loginWithFacebook() {
    this.auth0.authorize({
      connection: 'facebook',
    });
  }

  parseHash(hash) {
    this.auth0.parseHash(hash, (err, authResult) => {
      // console.log('authResult');
      // console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken);
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (error, profile) => (error ? reject(error) : resolve(profile)));
    });
  }

  loggedIn() {
        // Checks if there is a saved token and it's still valid
    const token = this.getToken();
     return !!token && !isTokenExpired(token);
  }

  setToken(accessToken, idToken) {
        // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
  }

  setProfile(profile) {
    console.log('profile');
        // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
        // Triggers profile_updated event to update the UI
    // this.emit('profile_updated', profile);
  }

  getProfile() {
        // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  getToken() {
        // Retrieves the user token from localStorage
    return localStorage.getItem('user_access_token');
  }

  getNextPathname() {
        // Retrieves the nextState from localStorage
    const path = localStorage.getItem('nextState');
    return path ? JSON.parse(path).location.pathname : '/dashboard';
  }
  removeNextPathname() {
      // clear nextPath to avoid redirections
    localStorage.removeItem('nextState');
  }

  logout() {
        // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_access_token');
  }
}
