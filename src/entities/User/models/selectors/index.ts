import {UserSchema} from 'entities/User/models/store/useUserStore';

export const selectUser = (state: UserSchema) => state.user
export const selectSetUser = (state: UserSchema) => state.setUser
export const selectId = (state: UserSchema) => state.id
export const selectSetId = (state: UserSchema) => state.setId
