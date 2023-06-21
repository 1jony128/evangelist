import {IProfileStore} from '@/features/editProfile/model/store/useProfileStore';

export const selectShow  = (state: IProfileStore) => state.show
export const selectSetShow  = (state: IProfileStore) => state.setShow
export const selectFile  = (state: IProfileStore) => state.file
export const selectSetFile  = (state: IProfileStore) => state.setFile


