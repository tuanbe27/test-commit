import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../types/auth.type';

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/api/auth/register', data, config);
      localStorage.setItem('authToken', response.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
          message: response.data.message,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: e.response.data.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  console.log(data);
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/api/auth/login', data, config);
      localStorage.setItem('authToken', response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: response.data.token,
          message: response.data.message,
        },
      });
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          error: e.response.data.errorMessage,
        },
      });
    }
  };
};
