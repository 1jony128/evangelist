import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LoginShema} from 'entities/FormLogin/models/types/loginShema';
import {Form} from 'entities/FormLogin/models/types/form';

const initialState: LoginShema = {
    isRegistration: true,
    name: "",
    access_key: "",
    login: "",
    password: "",
    repeat_password: "",
    auth: false
};

export const LoginSlice = createSlice({
    name: 'profile',
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
        }
    }
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = LoginSlice;
export const { reducer: loginReducer } = LoginSlice;