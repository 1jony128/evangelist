import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Form} from 'entities/FormLogin/models/types/form';
import {ProfileShema} from 'entities/FormProfile/models/types/profileShema';

const initialState: ProfileShema = {
    name: "",
    new_password: "",
    repeat_password: "",
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // changeIsRegistration(state, {payload}: PayloadAction<boolean>){
        //     state.isRegistration = payload
        // },
        // changeForm(state, {payload}: PayloadAction<Form>){
        //     //@ts-ignore
        //     state[payload.key] = payload.value
        // },
        // loginSuccess(state){
        //     state.auth = true
        // }
    }
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = ProfileSlice;
export const { reducer: loginReducer } = ProfileSlice;