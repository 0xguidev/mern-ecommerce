import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : { user: {}, token: '', isLoged: false };

const userLoginReducer = createSlice({
  name: 'login',
  initialState: {
    loading: 'idle',
    loginState: userInfoFromStorage.isLoged,
    token: userInfoFromStorage.token,
    user: userInfoFromStorage.user,
    error: '',
  },
  reducers: {
    userLoginRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
      if (state.error) {
        state.error = '';
      }
      if (state.loginState) {
        state.loginState = false;
      }
      if (state.token) {
        state.token = '';
      }
    },
    userLoginSucess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.token = action.payload.token;
        state.user = action.payload;
        state.loginState = true;
      }
    },
    userLoginFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
    userLogout(state) {
      state.loading = 'idle';
      state.loginState = false;
      state.user = {};
      state.token = '';
    },
  },
});

export const { userLoginFail, userLoginRequest, userLoginSucess, userLogout } =
  userLoginReducer.actions;
export default userLoginReducer.reducer;

export const asyncUserLoginRequest = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const { status, data } = await axios.post(
      'http://localhost:3001/api/users/login',
      {
        email,
        password,
      }
    );
    if (status === 200) {
      dispatch(userLoginSucess(data));
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ user: data, token: data.token, isLoged: true })
      );
    }
  } catch (e) {
    dispatch(userLoginFail(e.response.data.message));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ user: {}, token: '', isLoged: false })
  );
  dispatch(userLogout());
};
