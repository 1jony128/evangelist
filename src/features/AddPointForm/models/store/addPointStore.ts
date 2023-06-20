import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {IPoint} from 'entities/Point/models/types/point';
import {DaDataAddress, DaDataSuggestion} from 'react-dadata';

export type IMode = 'create' | 'edit'

export interface AddPointShema {
  isOpen: boolean
  mode: IMode
  setOpen: (mode: IMode, point?: IPoint) => void
  setClose: () => void
  setFio: (payload: ISelectUser | null) => void
  count: number
  setCount: (value: number) => void
  fio: ISelectUser | null
  address: DaDataSuggestion<DaDataAddress> | string | undefined,
  setAddress: (value: DaDataSuggestion<DaDataAddress> | string |  undefined) => void
  point: IPoint | null
  comment: string
  clearForm: () => void
  setComment: (payload: string) => void
}

export interface ISelectUser{
  id: string,
  value: string
}


export const useAddPointStore = create<AddPointShema>()(
  devtools(
    (set) => ({
      count: 25,
      mode: 'create',
      isOpen: false,
      fio: null,
      address: undefined,
      point: null,
      comment: "",
      clearForm:() => set((state) => ({
        count: 25,
        mode: 'create',
        isOpen: false,
        fio: null,
        address: undefined,
        point: null,
        comment: "",
      }), false, "addPoint/setCount"),
      setComment: (comment: string) => set((state) => ({
        comment
      }), false, "addPoint/setComment"),
      setCount:(count) => set((state) => ({
        count
      }), false, "addPoint/setCount"),
      setAddress: (address) => set((state) => ({
        address
      }), false, "addPoint/setAddress"),
      setFio: (fio) => set((state) => ({
        fio
      }), false, "addPoint/setFio"),
      setOpen: (mode, point) => set((state) => ({
        isOpen: true,
        mode,
        point
      }), false, "addPoint/setOpen"),
      setClose: () => set((state) => ({
        isOpen: false
      }), false, "addPoint/setClose"),
    }), { name: "addPoint" })
)
// setSelectPoint(state, {payload}: PayloadAction<string>){
//   state.selectPoint = payload
// }
