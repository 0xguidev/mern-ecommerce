import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : { user: {}, isLoged: false };

const userReducer = createSlice({
  name: 'login',
  initialState: {
    loading: 'idle',
    loadingListUsers: 'idle',
    listUsers: '',
    loginState: userInfoFromStorage.isLoged,
    user: userInfoFromStorage.user,
    error: '',
    errorListUsers: '',
  },
  reducers: {
    userRequest: (state) => {
      if (state.loading === 'idle') {
        return {
          ...state,
          loading: 'pending',
          error: '',
          loginState: false,
        };
      }
      return state;
    },
    userLoginSuccess: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          user: action.payload,
          loginState: true,
        };
      }
      return state;
    },
    userLoginFail: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          error: action.payload,
        };
      }
      return state;
    },
    updateSuccess: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          user: action.payload,
        };
      }
      return state;
    },
    updateFail: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          error: action.payload,
        };
      }
      return state;
    },
    registerSuccess: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          user: action.payload,
          loginState: true,
        };
      }
      return state;
    },
    registerFail: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          error: action.payload,
        };
      }
      return state;
    },
    userLogout: (state) => {
      return {
        ...state,
        loading: 'idle',
        loginState: false,
        user: {},
        token: '',
      };
    },
    listUsersLoading: (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    },
    listUsersSuccess: (state, action) => {
      return {
        ...state,
        loadingListUsers: 'idle',
        listUsers: action.payload,
      };
    },
    listUsersError: (state, action) => {
      return {
        ...state,
        loadingListUsers: 'idle',
        errorListUsers: action.payload,
      };
    },
  },
});

export const {
  userRequest,
  userLoginFail,
  userLoginSuccess,
  userLogout,
  updateFail,
  updateSuccess,
  registerSuccess,
  registerFail,
  listUsersError,
  listUsersSuccess,
  listUsersLoading,
} = userReducer.actions;
export default userReducer.reducer;

export const asyncUserLoginRequest =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch(userRequest());

      const {
        user: { user },
      } = getState();

      const { data, status } = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/users/login',
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });

      if (status === 200) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ user: data, token: data.token, isLoged: true })
        );
        return dispatch(userLoginSuccess(data));
      }
    } catch (e) {
      return dispatch(userLoginFail(e.response.data.message));
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('checkout');
  localStorage.removeItem('__paypal_storage__');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  return dispatch(userLogout());
};

export const asyncUserUpdateRequest =
  (password) => async (dispatch, getState) => {
    try {
      dispatch(userRequest());
      const {
        user: { user },
      } = getState();
      const { data, status } = await axios({
        method: 'put',
        url: 'http://localhost:3001/api/users/profile',
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          password: `${password}`,
        }),
      });
      if (status === 200) {
        return dispatch(updateSuccess(data));
      }
    } catch (e) {
      return dispatch(updateFail(e.response.data.message));
    }
  };

export const asyncRegisterRequest =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch(userRequest());
      const {
        user: { user },
      } = getState();
      const { data, status } = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/users',
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        data: {
          name,
          email,
          password,
        },
      });

      if (status === 200) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ user: data, isLoged: true })
          );
          return dispatch(registerSuccess(data));
        }
    } catch (e) {
      return dispatch(registerFail(e.response.data.message));
    }
  };

export const getListUsers = () => async (dispatch, getState) => {
  try {
    dispatch(listUsersLoading());
    const {
      user: { user },
    } = getState();
    const { data, status } = await axios({
      method: 'get',
      url: 'http://localhost:3001/api/users',
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    if(status === 200){
      return dispatch(listUsersSuccess(data));

    }
  } catch (e){
    return dispatch(listUsersError(e.response.data.message));
  }
};
