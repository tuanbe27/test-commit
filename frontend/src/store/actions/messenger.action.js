import axios from 'axios';
import { FRIENDS_GET_SUCCESS } from '../types/messenger.type';

export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/messenger/friends');
    dispatch({
      type: FRIENDS_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
