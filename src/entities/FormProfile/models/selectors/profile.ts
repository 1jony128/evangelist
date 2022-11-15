import {StateSchema} from 'app/providers/StoreProvider';

export const getName = (state: StateSchema) => state.profile.name;
export const getNewPassword = (state: StateSchema) => state.profile.new_password;
export const getRepeatPassword = (state: StateSchema) => state.profile.repeat_password;