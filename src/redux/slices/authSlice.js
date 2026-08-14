import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi";   

export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const res = await authApi.registerUser(formData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, thunkAPI) => {
        try {
            const { rememberMe, ...credentials } = formData;
            const res = await authApi.loginUser(credentials);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
)

const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        token:  storedToken || null,
        loading: false,
        error: null,
    },
    // synchronous action clear state only, no async logic
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        },
    },

    // part of async, catch the async action and update
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to register user';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
               
                const storage = action.meta.arg.rememberMe ? localStorage : sessionStorage;
                storage.setItem('token', action.payload.token);
                storage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase (loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

//logout action is synchronous, so we can export it directly from the slice
export const { logout } = authSlice.actions;
export default authSlice.reducer;