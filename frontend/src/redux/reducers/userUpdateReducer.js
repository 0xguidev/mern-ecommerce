import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const updateReducer = createSlice({
    name: 'updateUser',
    initialState: {
        loading: 'idle',
        user: {},
        error: '',
    },
    reducers: {
        updateRequest(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending';
            }
            if(state.error) {
                state.error = '';
            }
            if(state.token) {
                state.token = '';
            }
        },
        updateSuccess(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.user = action.payload;
            }
        },
        updateFail(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = action.payload;
            }
        },
    },
});

export const {
    updateFail,
    updateRequest,
    updateSuccess,
} = updateReducer.actions;
export default updateReducer.reducer;

export const asyncUserUpdateRequest = (password, token) => async (dispatch) => {
    try {
        dispatch(updateRequest());
        const {data, status} = await axios({
            method: 'put',
            url: 'http://localhost:3001/api/users/profile',
            headers: {
                authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "password": `${password}`
            })
        });
        if (status === 200) {
            dispatch(updateSuccess(data))
        }

    } catch (e) {
        dispatch(updateFail(e.response.data.message))
    }


};
