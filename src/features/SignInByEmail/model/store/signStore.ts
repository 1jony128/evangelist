import create from 'zustand'
import { devtools } from 'zustand/middleware'

export interface ISignStore {
  show: boolean,
  setShow: (auth: boolean) => void,
  // showCard: (id: number) => void,
}


export const useSignStore = create<ISignStore>()(
  devtools(
    (set) => ({
      show: false,
      setShow: (show: boolean) => set((state) => ({
        show
      }), false, "auth/setAuth"),
    }), { name: "sign" })
)
