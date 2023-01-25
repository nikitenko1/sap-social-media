import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get all groups of the user
export const getPosts = (groupId, token) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${groupId}`, token);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/like/${id}`, {}, token);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id, token) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/unlike/${id}`, {}, token);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${id}`, token);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData, id, token) => async (dispatch) => {
  try {
    const res = await axios.post(`/posts/${id}`, formData, token);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (postId, token) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/post/${postId}`, token);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData, token) => async (dispatch) => {
  try {
    const res = await axios.post(`/posts/comment/${postId}`, formData, token);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId, token) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postId}/${commentId}`, token);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
