import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GROUPS,
  GROUP_ERROR,
  GET_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  DELETE_GROUP,
  UPDATE_GROUP_FOLLOWER,
  GROUP_FOLLOWER_ERROR,
} from './types';

// Get all groups of the user
export const getMyGroups = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/groups/myGroup', token);
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get all groups
export const getGroups = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/groups', token);
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get a groups by a given id
export const getGroupById = (groupId, token) => async (dispatch) => {
  try {
    const res = await axios.get(`/groups/${groupId}`, token);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// create new group
export const newGroup =
  ({ name, subject, about }, token) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ name, subject, about });
      const res = await axios.post('/groups', body, token);
      dispatch({
        type: CREATE_GROUP_SUCCESS,
        payload: res.data, // its the new group
      });
      dispatch(setAlert('group created', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: CREATE_GROUP_FAIL,
      });
    }
  };

// Delete group
export const deleteGroup = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`/groups/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });

    dispatch(setAlert('Group Removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//addGroupFollower
export const addGroupFollower = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(`/profile/addFollowingGroup/${id}`, token);

    dispatch({
      type: UPDATE_GROUP_FOLLOWER,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_FOLLOWER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// removeGroupFollower
export const removeGroupFollower = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/profile/removeFollowingGroup/${id}`,
      {},
      token
    );

    dispatch({
      type: UPDATE_GROUP_FOLLOWER,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: GROUP_FOLLOWER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
