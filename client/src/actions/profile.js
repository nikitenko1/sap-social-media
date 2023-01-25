import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_FRIENDS,
  GET_PROFILE,
  GET_CONVERSATION_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  UPDATE_FOLLOWER,
  FOLLOWER_ERROR,
  GET_SEARCH_PROFILES,
} from './types';

//get friends of the user
export const getFriends = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile/me');
    const myProfile = res.data;
    let friends = [];
    for (let i = 0; i < myProfile.followers.length; i++) {
      const followerProfile = await axios.get(
        `/profile/user/${myProfile.followers[i]}`
      );
      friends.push(followerProfile.data);
    }
    for (let i = 0; i < myProfile.following.length; i++) {
      const followingProfile = await axios.get(
        `/profile/user/${myProfile.following[i]}`
      );
      friends.push(followingProfile.data);
    }

    dispatch({
      type: GET_FRIENDS,
      payload: friends,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// searchProfiles
export const searchProfiles =
  (formData, navigate, token) => async (dispatch) => {
    try {
      const res = await axios.post('/profile/search', formData, token);

      dispatch({
        type: GET_SEARCH_PROFILES,
        payload: res.data,
      });
      navigate('/searchResult');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  };

// getCurrentProfile
export const getCurrentProfile = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/profile/me', token);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false, token) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/profile', formData, edit, token);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      navigate.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  };

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      // res.status(500).send('server error');
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get Conversation profile by ID
export const getConversationProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_CONVERSATION_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  }
};

//addFollower
export const addFollower = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(`/profile/addFollower/${id}`, token);

    dispatch({
      type: UPDATE_FOLLOWER,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: FOLLOWER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// removeFollower
// removeFollower/:id
export const removeFollower = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(`/profile/removeFollower/${id}`);

    dispatch({
      type: UPDATE_FOLLOWER,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: FOLLOWER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
