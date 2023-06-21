import {ISignStore} from '@/features/SignInByEmail/model/store/signStore';

export const selectShowSign = (state: ISignStore) => state.show
export const selectSetShowSign = (state: ISignStore) => state.setShow
