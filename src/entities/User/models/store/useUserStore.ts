import create from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "entities/User/models/types/userTypes";

export interface UserSchema {
  user: IUser | null;
  setUser: (payload: IUser) => void;
  id: string | null;
  setId: (payload: string) => void;
}

export const useUserStore = create<UserSchema>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user: IUser) =>
        set(
          (state) => ({
            user,
          }),
          false,
          "user/setUser"
        ),
      id: null,
      setId: (id: string) =>
        set(
          (state) => ({
            id,
          }),
          false,
          "user/setId"
        ),
    }),
    { name: "user" }
  )
);
// setSelectPoint(state, {payload}: PayloadAction<string>){
//   state.selectPoint = payload
// }
