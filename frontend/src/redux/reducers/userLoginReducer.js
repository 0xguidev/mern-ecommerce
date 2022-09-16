import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userLoginReducer = createSlice({
    name: 'login',
    initialState: {
        loading: 'idle',
        loginState: false,
        token: '',
        user: {},
        error: '',
    },
    reducers: {
        userLoginRequest(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending';
            }
            if(state.error) {
                state.error = '';
            }
            if(state.loginState) {
                state.loginState = false;
            }
            if(state.token) {
                state.token = '';
            }
        },
        userLoginSucess(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.token = action.payload.token;
                state.user = action.payload;
                state.loginState = true
            }
        },
        userLoginFail(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = action.payload;
            }
        },
        userLogout(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = action.payload;
            }
        },
    },
});

export const {
    userLoginFail,
    userLoginRequest,
    userLoginSucess,
    // userLogout,
} = userLoginReducer.actions;
export default userLoginReducer.reducer;

export const asyncUserLoginRequest = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoginRequest());
        const {status, data} = await axios.post('http://localhost:3001/api/users/login', {
            email,
            password,
        });
        if (status === 200) {
            dispatch(userLoginSucess(data))
        }
    } catch (e) {
        dispatch(userLoginFail(e.response.data.message))
    }


};
//
// export const asyncSingleProduct = (productId) => async (dispatch) => {
//     try {
//         dispatch(productsLoading());
//         const { data } = await axios.get(
//             `http://localhost:3001/api/products/${productId}`
//         );
//         dispatch(singleProductReceived(data));
//     } catch (error) {
//         dispatch(throwErrorProduct(error.message));
//     }
// };
