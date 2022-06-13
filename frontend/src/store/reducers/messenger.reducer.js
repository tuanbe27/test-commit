import {
  GET_FRIENDS_FAIL,
  GET_FRIENDS_SUCCESS,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  IS_LOADING,
  SOCKET_MESSAGE,
  MESSAGE_SEND_SUCCESS_CLEAR,
} from '../types/messenger.type';

const messengerState = {
  friends: [],
  messages: [],
  isSend: false,
  isLoading: true,
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === GET_FRIENDS_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }
  if (type === GET_FRIENDS_FAIL) {
    return {
      ...state,
      friends: [],
    };
  }

  if (type === SEND_MESSAGE_SUCCESS) {
    return {
      ...state,
      isSend: true,
      messages: [...state.messages, payload.message],
    };
  }

  if (type === SOCKET_MESSAGE) {
    return {
      ...state,
      messages: [...state.messages, payload.message],
    };
  }

  if (type === SEND_MESSAGE_FAIL) {
    return {
      ...state,
      messages: [...state.messages],
    };
  }

  if (type === GET_MESSAGE_SUCCESS) {
    return {
      ...state,
      messages: payload.messages,
      isLoading: payload.isLoading,
    };
  }

  if (type === GET_MESSAGE_FAIL) {
    return {
      ...state,
      messages: [],
      isLoading: payload.isLoading,
    };
  }

  if (type === IS_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === MESSAGE_SEND_SUCCESS_CLEAR) {
    return {
      ...state,
      isSend: false,
    };
  }

  return state;
};
