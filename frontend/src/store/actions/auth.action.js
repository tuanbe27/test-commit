import axios from 'axios';
import { REGISTER_FAIL } from '../types/auth.type';

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        '/api/messenger/user-register',
        data,
        config
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: e.response.data.error.errorMessage,
        },
      });
    }
  };
};
