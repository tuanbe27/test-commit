import axios from 'axios';
import {
  GET_FRIENDS_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS,
} from '../types/messenger.type';


export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/messenger/friends');
    dispatch({
      type: GET_FRIENDS_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const sendMessage = (data) => async (dispatch) => {
  try {
    const response = await axios.post('/api/messenger/send', data);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: {
        message: response.data.message
      }
    })
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessages = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/messenger/friend/${id}`);
    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: {
        messages: response.data.message,
        isLoading: false
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const sendImageMassage = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/messenger/send-image`, data);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
}
