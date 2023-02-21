import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IPoint, Street, StreetData} from 'entities/Point/models/types/point';

export interface AddPointShema {
  isOpen: boolean
  setOpen: () => void
  setClose: () => void
  setFio: (payload: ISelectUser) => void
  count: number
  fio: ISelectUser | null
}

export interface ISelectUser{
  id: string,
  value: string
}


export const useAddPointStore = create<AddPointShema>()(
  devtools(
    (set) => ({
      count: 25,
      isOpen: false,
      fio: null,
      setFio: (fio: ISelectUser) => set((state) => ({
        fio
      }), false, "addPoint/setFio"),
      setOpen: () => set((state) => ({
        isOpen: true
      }), false, "addPoint/setOpen"),
      setClose: () => set((state) => ({
        isOpen: false
      }), false, "addPoint/setClose"),
    }), { name: "addPoint" })
)
// setSelectPoint(state, {payload}: PayloadAction<string>){
//   state.selectPoint = payload
// }
