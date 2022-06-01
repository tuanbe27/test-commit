import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  ERROR_CLEAR,
  MESSAGE_CLEAR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../types/auth.type';
import jwtDecode from 'jwt-decode';

const authState = {
  loading: true,
  authenticate: false,
  error: '',
  message: '',
  myInfo: '',
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

const getToken = localStorage.getItem('authToken');
if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.myInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
  }
}

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: '',
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      error: '',
      authenticate: true,
      myInfo: myInfo,
      message: payload.message,
      loading: false,
    };
  }
  console.log(type);
  console.log(payload);
  if (type === LOGIN_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: '',
      loading: true,
    };
  }

  if (type === LOGIN_SUCCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      error: '',
      authenticate: true,
      myInfo: myInfo,
      loading: false,
    };
  }

  if (type === MESSAGE_CLEAR) {
    return {
      ...state,
      message: '',
    };
  }

  if (type === ERROR_CLEAR) {
    return {
      ...state,
      error: '',
    };
  }

  return state;
};
