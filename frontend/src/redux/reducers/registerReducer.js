import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {userLoginRequest, userLoginSucess} from "./userLoginReducer";


const registerReducer = createSlice({
    name: 'register',
    initialState: {
        loading: 'idle',
        user: {},
        error: '',
    },
    reducers: {
        registerRequest(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending';
            }
            if(state.user) {
                state.user = {}
            }
            if(state.error) {
                state.error = '';
            }
        },
        registerSucess(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.user = action.payload;
            }
        },
        registerFail(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = action.payload;
            }
        }
    },
});

export const {
    registerRequest,
    registerSucess,
    registerFail,
} = registerReducer.actions;
export default registerReducer.reducer;

export const asyncRegisterRequest = ({name, email, password}) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        dispatch(userLoginRequest());
        const {status, data} = await axios.post('http://localhost:3001/api/users', {
            name,
            email,
            password,
        });
        if (status === 200) {
            dispatch(registerSucess(data))
            dispatch(userLoginSucess(data))
            localStorage.setItem('userInfo', JSON.stringify({user: data, token: data.token, isLoged: true}))
        }

    } catch (e) {
        dispatch(registerFail(e.response.data.message))
    }


};

