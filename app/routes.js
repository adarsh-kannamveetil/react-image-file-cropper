// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import AuthService from 'utils/AuthService';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const auth = new AuthService();

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log(nextState.location.pathname);
        // localStorage.setItem('nextState', JSON.stringify(nextState));
    replace({ pathname: '/login' });
  }
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'dashboard',
      // onEnter: requireAuth,
      getComponent(nextState, cb) {
        System.import('containers/Dashboard')
                  .then(loadModule(cb))
                  .catch(errorLoading);
      },
    },

    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
