import {StateSchema} from 'app/providers/StoreProvider';

export const getIsRegistration = (state: StateSchema) => state.login.isRegistration;
export const getName = (state: StateSchema) => state.login.name;
export const getLogin = (state: StateSchema) => state.login.login;
export const getAccessKey = (state: StateSchema) => state.login.access_key;
export const getPassword = (state: StateSchema) => state.login.password;
export const getRepeatPassword = (state: StateSchema) => state.login.repeat_password;
export const getAuth = (state: StateSchema) => state.login.auth;

export const getError = (state: StateSchema) => state.login.error;
