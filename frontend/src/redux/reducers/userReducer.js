import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ordersReset } from './ordersReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : { user: {}, isLoged: false };

const userReducer = createSlice({
  name: 'login',
  initialState: {
    loadingLogin: 'idle',
    loadingList: 'idle',
    loadingDelete: 'idle',
    loadingUpdate: 'idle',
    loadingRegister: 'idle',
    loadingDetails: 'idle',
    loadingAdminUpdate: 'idle',
    listUsers: '',
    loginState: userInfoFromStorage.isLoged,
    user: userInfoFromStorage.user,
    userDetails: '',
    deleteSuccess: false,
    errorLogin: '',
    errorList: '',
    errorDelete: '',
    errorUpdate: '',
    errorRegister: '',
    errorDetails: '',
    errorAdminUpdate: '',
    stateUpdateUser: false,
  },
  reducers: {
    loginRequest: (state) => {
      return {
        ...state,
        loadingLogin: 'pending',
        errorLogin: '',
        loginState: false,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        loadingLogin: 'idle',
        user: action.payload,
        loginState: true,
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        loadingLogin: 'idle',
        errorLogin: action.payload,
      };
    },
    updateRequest: (state) => {
      return {
        ...state,
        loadingUpdate: 'pending',
        errorUpdate: '',
        loginState: false,
      };
    },
    updateSuccess: (state, action) => {
      return {
        ...state,
        loadingUpdate: 'idle',
        user: action.payload,
      };
    },
    updateFail: (state, action) => {
      return {
        ...state,
        loadingUpdate: 'idle',
        errorUpdate: action.payload,
      };
    },
    registerRequest: (state) => {
      return {
        ...state,
        loadingRegister: 'pending',
        loginState: false,
      };
    },
    registerSuccess: (state, action) => {
      return {
        ...state,
        loadingRegister: 'idle',
        user: action.payload,
        loginState: true,
      };
    },
    registerFail: (state, action) => {
      return {
        ...state,
        loadingRegister: 'idle',
        errorRegister: action.payload,
      };
    },
    userLogout: (state) => {
      return {
        ...state,
        loading: 'idle',
        loginState: false,
        user: {},
        listUsers: '',
        token: '',
      };
    },
    listUsersRequest: (state) => {
      return {
        ...state,
        loadingList: 'pending',
        stateUpdateUser: false
      };
    },
    listUsersSuccess: (state, action) => {
      return {
        ...state,
        loadingList: 'idle',
        listUsers: action.payload,
      };
    },
    listUsersError: (state, action) => {
      return {
        ...state,
        loadingList: 'idle',
        errorList: action.payload,
      };
    },
    deleteUserRequest: (state) => {
      return {
        ...state,
        loadingDelete: 'pending',
        deleteSuccess: false,
      };
    },
    deleteUserSuccess: (state) => {
      return {
        ...state,
        loadingDelete: 'idle',
        deleteSuccess: true,
      };
    },
    deleteUserFail: (state, action) => {
      return {
        ...state,
        loadingDelete: 'idle',
        errorDelete: action.payload,
      };
    },
    detailsUserRequest: (state) => {
      return {
        ...state,
        loadingDetails: 'pending',
        userDetails: '',
        stateUpdateUser: false
      };
    },
    detailsUserSuccess: (state, action) => {
      return {
        ...state,
        loadingDetails: 'idle',
        userDetails: action.payload,
      };
    },
    detailsUserFail: (state, action) => {
      return {
        ...state,
        loadingDetails: 'idle',
        errorDetails: action.payload,
      };
    },
    updateAdminRequest: (state) => {
      return {
        ...state,
        loadingAdminUpdate: 'pending',
        errorUpdate: '',
        userDetails: '',
        stateUpdateUser: false
      };
    },
    updateAdminSuccess: (state, action) => {
      return {
        ...state,
        loadingAdminUpdate: 'idle',
        userDetails: action.payload,
        stateUpdateUser: true
      };
    },
    updateAdminFail: (state, action) => {
      return {
        ...state,
        loadingAdminUpdate: 'idle',
        errorAdminUpdate: action.payload,
      };
    },
  },
});

export const {
  loginRequest,
  loginFail,
  loginSuccess,
  userLogout,
  updateRequest,
  updateFail,
  updateSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  listUsersError,
  listUsersSuccess,
  listUsersRequest,
  listUsersReset,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  detailsUserRequest,
  detailsUserSuccess,
  detailsUserFail,
  updateAdminRequest,
  updateAdminSuccess,
  updateAdminFail,
} = userReducer.actions;
export default userReducer.reducer;

export const asyncUserLoginRequest =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch(loginRequest());

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
        return dispatch(loginSuccess(data));
      }
    } catch (e) {
      return dispatch(loginFail(e.response.data.message));
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('checkout');
  localStorage.removeItem('__paypal_storage__');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch(ordersReset());
  return dispatch(userLogout());
};

export const asyncUserUpdateRequest =
  (password) => async (dispatch, getState) => {
    try {
      dispatch(updateRequest());
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
      dispatch(registerRequest());
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
    dispatch(listUsersRequest());
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
    if (status === 200) {
      return dispatch(listUsersSuccess(data));
    }
  } catch (e) {
    return dispatch(listUsersError(e.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteUserRequest());
    const {
      user: { user },
    } = getState();
    const { status } = await axios({
      method: 'delete',
      url: `http://localhost:3001/api/users/${id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    if (status === 200) {
      return dispatch(deleteUserSuccess());
    }
  } catch (e) {
    return dispatch(deleteUserFail(e.message));
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(detailsUserRequest());
    const {
      user: { user },
    } = getState();
    const { data, status } = await axios({
      method: 'get',
      url: `http://localhost:3001/api/users/${id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    if (status === 200) {
      return dispatch(detailsUserSuccess(data));
    }
  } catch (e) {
    return dispatch(detailsUserFail(e.message));
  }
};

export const updateUser =
  (id, userData) =>
  async (dispatch, getState) => {
    try {
      dispatch(updateAdminRequest());
      const {
        user: { user },
      } = getState();
      const { data, status } = await axios({
        method: 'put',
        url: `http://localhost:3001/api/users/${id}`,
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        data: userData,
      });
      if (status === 200) {
        return dispatch(updateAdminSuccess(data));
      }
    } catch (e) {
      return dispatch(updateAdminFail(e.response.data.message));
    }
  };
