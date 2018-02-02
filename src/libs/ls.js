import Vue from 'vue';
import isNil from 'lodash/isNil';

var LOGIN_INFO = 'loginInfo', LOGIN_KEYIN = 'loginKeyin',
  TICKER_SMS = 'tickerSMS', TICKER_EMAIL = 'tickerEmail';

export function getAccessToken() {
  var loginInfo = getLoginInfo();

  return loginInfo && loginInfo['accessToken'] || '';
}

export function getLoginInfo() {
  return getter(LOGIN_INFO);
}

export function setLoginInfo(data) {
  return setter(LOGIN_INFO, data);
}

export function getLoginKeyin() {
  return getter(LOGIN_KEYIN);
}

export function setLoginKeyin(data) {
  return setter(LOGIN_KEYIN, data);
}

export function getTickerSMS() {
  return getter(TICKER_SMS);
}

export function setTickerSMS(data) {
  return setter(TICKER_SMS, data);
}

export function getTickerEmail() {
  return getter(TICKER_EMAIL);
}

export function setTickerEmail(data) {
  return setter(TICKER_EMAIL, data);
}

export function clear() {
  setLoginInfo({});
  setTickerSMS({});
  setTickerEmail({});
}

function getter(id) {
  var data = Vue.localStorage.get(id);

  if (isNil(data) || data === 'undefined') return {};

  return JSON.parse(data);
}

function setter(id, data) {
  Vue.localStorage.set(id, JSON.stringify(data));

  return true;
}