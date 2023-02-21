import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface IStore {
  auth: boolean,
  setAuth: (auth: boolean) => void,
  // showCard: (id: number) => void,
}


export const useCardsStore = create<IStore>()(
  devtools(
    (set) => ({
      auth: false,
      setAuth: (auth: boolean) => set((state) => ({
        auth
      }), false, "auth/setAuth"),
    }), { name: "auth" })
)
