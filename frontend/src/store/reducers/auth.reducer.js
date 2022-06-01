import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/auth.type";
import jwtDecode from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  message: "",
  myInfo: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: "",
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      error: "",
      authenticate: true,
      myInfo: myInfo,
      message: payload.message,
      loading: false,
    };
  }
  return state;
};
