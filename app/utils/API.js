import { memoize } from 'lodash';

import request from 'utils/request';

const defaultOptions = { credentials: 'same-origin', headers: {} };
const methodsWithPayload = ['POST', 'PUT', 'PATCH', 'DELETE'];

// const API_URL = 'http://192.168.1.9:3500/v1';
const API_URL = 'http://52.27.131.106:3500/v1';

/* eslint-disable no-underscore-dangle */
function _apiCall(path, options = {}) {
  const defaultedOptions = Object.assign({}, defaultOptions, options);

  if (defaultedOptions.fileUpload) {
    defaultedOptions.headers['Content-Type'] = defaultedOptions.body.type;
  } else {
    defaultedOptions.headers['Content-Type'] = 'application/json';
  }
  if (methodsWithPayload.indexOf(defaultedOptions.method) > -1 && defaultedOptions.body) {
    defaultedOptions.body = typeof defaultedOptions.body === 'string'
            ? defaultedOptions.body
            : JSON.stringify(defaultedOptions.body);
  }
  if (defaultedOptions.auth) {
    defaultedOptions.headers.Authorization = `Bearer ${getUserAuthToken()}`;
  } else {
    delete defaultedOptions.headers.Authorization;
  }
  let defaultedPath = typeof path === 'string' ? path : path.join('/');
  if (defaultedOptions.params) {
    const esc = encodeURIComponent;
    const query = Object.keys(defaultedOptions.params)
          .map((k) => `${esc(k)}=${esc(defaultedOptions.params[k])}`)
          .join('&');
    defaultedPath = `${defaultedPath}?${query}`;
  }
  let URL = `${API_URL}/${defaultedPath}`;
  if (defaultedOptions.crossOrigin) {
    URL = defaultedPath;
  }
  const fetch = request(URL, defaultedOptions)
        .then((result) => result);
  // return request(URL, defaultedOptions);
  return fetch;
}

function getUserAuthToken() {
  return localStorage.getItem('user_access_token');
}

// uses native xhr for PUT / File upload handling..
function makeRequest(method, url, file, imgUrl, id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Cache-Control', 'public,max-age=3600');
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        let data;
        if (id) {
          data = { portfolio_id: id,
            portfolio_image_url: imgUrl };
        } else {
          data = imgUrl;
        }
        resolve(data);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(file);
  });
}
let callId = 0;
export const call = process.env.NODE_ENV === 'production'
    ? _apiCall
    : (path, options = {}, json = true, ...rest) => {
      const thisCallId = ++callId;
        /* eslint-disable no-console */
      console.log('API call', thisCallId, path, options);
      return _apiCall(path, options, json, ...rest)
            .then(
                (result) => {
                  console.info('API Result', thisCallId, json ? result : '(stream)');
                  return result;
                },
                (error) => {
                  console.log(error);
                  console.error('API Error', thisCallId, error.stack || error.message || error);
                  throw error;
                }
            );
        /* eslint-enable no-console */
    };

export default {
  prices: {
    getPrices(payload) {
      const url = 'price';
      return call(url, {
        method: 'GET',
        params: payload,
      });
    },
    list() {
      return call(['admin', 'price', 'listAll'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    edit(payload) {
      return call(['admin', 'price', 'costUpdate'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
  },
  auth: {
    login(payload) {
      return call(['auth', 'login', 'admin'], {
        method: 'POST',
        body: payload,
      });
    },
    signup(payload) {
      return call(['auth', 'register'], {
        method: 'POST',
        body: payload,
      });
    },
    social(payload) {
      return call(['auth', 'social'], {
        method: 'POST',
        body: payload,
      });
    },
  },
  orders: {
    list(payload) {
      return call(['admin', 'order', 'get'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    save(payload) {
      return call(['admin', 'order', 'save'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    update(payload) {
      return call(['admin', 'order', 'edit', payload.orderId], {
        method: 'POST',
        body: payload.data,
        auth: true,
      });
    },
    addFollower(payload) {
      console.log(payload);
      return call(['admin', 'order_follower'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    get(payload) {
      return call(['admin', 'order', 'get'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
  },
  getOrderFormData(payload) {
    const url = 'orderFormData';
    return call(url, {
      method: 'GET',
      params: payload,
    });
  },
  settings: {
    managePortfolio() {
      return call(['admin', 'portFolio', 'list'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    getPipelineStages() {
      return call(['admin', 'getPipelines'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    getMachineBrands() {
      return call(['admin', 'get_all_machine_brands'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    getBulkEditData() {
      return call(['admin', 'bulkEdit'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    listPorfolioDesigns(id) {
      return call(['admin', 'portfolioDesign', 'list', id], {
        method: 'GET',
        auth: true,
      });
    },
    addPortfolio(payload) {
      return call(['admin', 'portFolio', 'save'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    updatePortfolio(payload, id) {
      return call(['admin', 'portFolio', 'edit', id], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    addPortfolioDesign(payload) {
      return call(['admin', 'portfolioDesign', 'save'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    savePortfolioDesign(payload, id) {
      return call(['admin', 'portfolioDesign', 'save', id], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    deletePortfolioDesign(id) {
      return call(['admin', 'portfolioDesign', 'delete', id], {
        method: 'POST',
        auth: true,
      });
    },
    addMemberFormData() {
      return call(['admin', 'adminUserFormData'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    addmember(payload) {
      return call(['admin', 'register'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    getPermissions() {
      return call(['admin', 'permissions'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    savePermissions(payload) {
      return call(['admin', 'permission_roles', 'save'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    updatePermissionRoles(payload, id) {
      return call(['admin', 'permission_roles', 'edit', id], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    getPermissionRoles() {
      return call(['admin', 'permission_roles'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    editPermissionRoles(payload, roleId) {
      return call(['admin', 'permission_roles', 'edit', roleId], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    getUsers() {
      return call(['admin', 'backendUsers', 'list'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    setUsers(payload) {
      return call(['unplugged', 'select', 'F1002'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    getMemberUsers(key) {
      return call(['admin', 'users_member', 'search', key], {
        method: 'GET',
        auth: true,
      });
    },
    updateUser(payload, id) {
      return call(['admin', 'edit', id], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    updatePassword(payload, data) {
      return call(['unplugged', 'update', 'admin_users'], {
        method: 'POST',
        params: payload,
        body: data,
        auth: true,
      });
    },
    formats: {
      get() {
        return call(['fileFormats'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      add(payload) {
        return call(['admin', 'file_format', 'add'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      edit(payload) {
        return call(['admin', 'file_format', 'update'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      trash(formatId) {
        return call(['admin', 'file_format', formatId], {
          method: 'DELETE',
          body: null,
          auth: true,
        });
      },
    },
    location: {
      get() {
        return call(['admin', 'location', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      add(payload) {
        return call(['admin', 'location', 'add'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      edit(payload) {
        return call(['admin', 'location', 'update'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      delete(locationId) {
        return call(['admin', 'location', 'delete', locationId], {
          method: 'POST',
          body: null,
          auth: true,
        });
      },
    },
    fabric: {
      get() {
        return call(['admin', 'fabric', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      add(payload) {
        return call(['admin', 'fabric', 'add'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      edit(payload) {
        return call(['admin', 'fabric', 'update'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      delete(fabricId) {
        return call(['admin', 'fabric', 'delete', fabricId], {
          method: 'POST',
          body: null,
          auth: true,
        });
      },
    },
    discountcode: {
      get() {
        return call(['admin', 'coupon', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      add(payload) {
        return call(['admin', 'coupon', 'add'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      edit(payload) {
        return call(['admin', 'coupon', 'update'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
    },
    dispatch: {
      get() {
        return call(['admin', 'dispatch', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      save(payload) {
        return call(['admin', 'dispatch', 'save'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      delete(dispatchId) {
        return call(['admin', 'dispatch', 'delete', dispatchId], {
          method: 'POST',
          body: null,
          auth: true,
        });
      },
    },
    source: {
      list() {
        return call(['admin', 'source', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      save(payload) {
        return call(['admin', 'source', 'save'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      delete(id) {
        return call(['admin', 'source', 'delete', id], {
          method: 'DELETE',
          body: null,
          auth: true,
        });
      },
    },
    reason: {
      list() {
        return call(['admin', 'cancelReasons', 'list'], {
          method: 'GET',
          body: null,
          auth: true,
        });
      },
      save(payload) {
        return call(['admin', 'cancelReasons', 'save'], {
          method: 'POST',
          body: payload,
          auth: true,
        });
      },
      delete(id) {
        return call(['admin', 'cancelReasons', 'delete', id], {
          method: 'DELETE',
          body: null,
          auth: true,
        });
      },
    },
  },
  fileUpload: {
    getSignedUrl(files) {
      return call(['admin', 'aws-sign'], {
        method: 'POST',
        body: files,
        auth: true,
      });
    },
    uploadToS3(signedUrl, file, url, id) {
      return makeRequest('PUT', signedUrl, file, url, id);
    },
  },
  ticket: {
    add(payload) {
      return call(['admin', 'ticket', 'add'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    list() {
      return call(['admin', 'ticket', 'list'], {
        method: 'GET',
        auth: true,
      });
    },
    update(payload) {
      return call(['admin', 'ticket', 'update'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
    getSources() {
      return call(['admin', 'source', 'get'], {
        method: 'GET',
        auth: true,
      });
    },
  },
  saveComment(payload) {
    return call(['admin', 'addComment'], {
      method: 'POST',
      auth: true,
      body: payload,
    });
  },
  orderComments(payload) {
    return call(['admin', 'order-comments-list'], {
      method: 'GET',
      auth: true,
      params: payload,
    });
  },
  members: {
    list() {
      return call(['admin', 'members', 'list'], {
        method: 'GET',
        auth: true,
      });
    },
    edit(payload, contactId) {
      return call(['admin', 'edit_user_data', contactId], {
        method: 'POST',
        auth: true,
        body: payload,
      });
    },
  },

};
