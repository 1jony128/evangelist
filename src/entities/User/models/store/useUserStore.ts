import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IPoint, Street, StreetData} from 'entities/Point/models/types/point';
import {IUser} from 'entities/User/models/types/userTypes';

export interface UserShema {
  user: IUser | null
  setUser: (payload: IUser) => void

}


export const useUserStore = create<UserShema>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user: IUser) => set((state) => ({
        user
      }), false, "map/setComment"),
    }), { name: "map" })
)
// setSelectPoint(state, {payload}: PayloadAction<string>){
//   state.selectPoint = payload
// }
