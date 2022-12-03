import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LoginShema} from 'entities/FormLogin/models/types/loginShema';
import {Form} from 'entities/FormLogin/models/types/form';
import {registrationUser} from 'entities/FormLogin/models/services/registrationUser';
import {loginUser} from 'entities/FormLogin/models/services/loginUser';
import {isAuth} from 'entities/FormLogin/models/services/isAuth';

const initialState: LoginShema = {
    isRegistration: true,
    name: "",
    access_key: "",
    login: "",
    password: "",
    repeat_password: "",
    auth: false,
    token: null,
    error: undefined,
    loading: false
};

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeIsRegistration(state, {payload}: PayloadAction<boolean>){
            state.isRegistration = payload
        },
        changeForm(state, {payload}: PayloadAction<Form>){
            //@ts-ignore
            state[payload.key] = payload.value
        },
        loginSuccess(state){
            state.auth = true
        },
        setToken(state, {payload}: PayloadAction<string>){
            state.token = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.pending, (state) => {
                state.error = undefined;
                state.loading = true;
            })
            .addCase(registrationUser.fulfilled, (state) => {
                state.loading = false;
                state.auth = true
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.auth = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = LoginSlice;
export const { reducer: loginReducer } = LoginSlice;
