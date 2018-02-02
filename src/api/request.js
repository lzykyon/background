import axios from 'axios';
import { camelizeKeys } from 'humps';
import isNil from 'lodash/isNil';
import i18n from '../i18n';
import { getAccessToken } from '../libs/ls';
import { genProcessors } from '../store/helper';

const API_HOST = process.env.API_HOST;
export const ClearRequest = (store, type, options) => {
  return Request(store, type, options, genProcessors(store, type));
};

export default Request = ({ commit, dispatch, state }, type, options, cbs) => {
  console.log("this is Request");
  if (cbs && cbs.processing) {
    cbs.processing();
  } else {
    commit(type.base, { type: type.processing, value: true });
  }
  return new Promise((resolve, reject) => {
    sendRequest(options)
      .then((response) => {
        const { data, message, status } = camelizeKeys(response.data);

        if (cbs && cbs.success) {
          cbs.success(response);
        } else {
          commit(type.base, { type: type.success, data, message, status });
        }

        resolve(response);
      })
      .catch((error) => {
        if (cbs && cbs.failure) {
          cbs.failure(error);
        } else {
          commit(type.base, { type: type.failure, error });
        }

        reject(error);
      });
  });
};

export const Requestdd = (options) => {
  console.log("this is Requestdd");
  //return 1;
  return axios.get(`/user/remove`, { params: options });
};

function sendRequest(options) {
  console.log("this is sendRequest");
  const { url, method = 'GET', headers, auth = true, lang = true, body, qs, isLogin } = options;
  const HEADER = {
    DeviceOSType: 'ios',
    'Content-Type': isLogin ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8',
    ...headers,
  };
  const locale = `${i18n.locale.toLowerCase()}/`;
  const langUrl = lang ? locale : '';
  const data = isLogin ? convertSimpleObjToQueryString(body) : body;

  //if (auth) HEADER.Authorization = `bearer ${getAccessToken()}`;
  
  //return axios({
  //  baseURL: API_HOST,
  //  url: `${langUrl}${url}`,
  //  method: isLogin ? 'POST' : method,
  //  headers: HEADER,
  //  params: qs,
  //  data: data,
  //});

  return axios({
    baseURL: API_HOST,
    url: `${url}`,
    method: method,
    params: qs,
    data: data,
  });
}

function convertSimpleObjToQueryString(obj) {
  return Object.keys(obj)
    .filter(k => !isNil(obj[k]))
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&');
};