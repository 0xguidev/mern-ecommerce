import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : { user: {}, isLoged: false };

const userReducer = createSlice({
  name: 'login',
  initialState: {
    loading: 'idle',
    loginState: userInfoFromStorage.isLoged,
    user: userInfoFromStorage.user,
    error: '',
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
} = userReducer.actions;
export default userReducer.reducer;

export const asyncUserLoginRequest =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch(userRequest());

      const { user: { user } } = getState();

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
        dispatch(userLoginSuccess(data));
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
  localStorage.removeItem('userInfo');
  localStorage.removeItem('checkout');
  localStorage.removeItem('__paypal_storage__');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch(userLogout());
};

export const asyncUserUpdateRequest =
  (password) => async (dispatch, getState) => {
    try {
      dispatch(userRequest());
      const { user: { user } } = getState();
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
        dispatch(updateSuccess(data));
      }
    } catch (e) {
      dispatch(updateFail(e.response.data.message));
    }
  };

export const asyncRegisterRequest =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch(userRequest());
      const { status, data } = await axios.post(
        'http://localhost:3001/api/users',
        {
          name,
          email,
          password,
        }
      );
      if (status === 200) {
        dispatch(registerSuccess(data));
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ user: data, isLoged: true })
        );
      }
    } catch (e) {
      dispatch(registerFail(e.response.data.message));
    }
  };
