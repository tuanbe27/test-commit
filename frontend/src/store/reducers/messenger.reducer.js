import { FRIENDS_GET_FAIL, FRIENDS_GET_SUCCESS } from '../types/messenger.type';
const messengerState = {
  friends: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === FRIENDS_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }
  if (type === FRIENDS_GET_FAIL) {
  }

  return state;
};
