import create from 'zustand'
import { devtools } from 'zustand/middleware'

export interface IProfileStore {
  setShow: (show: boolean) => void,
  show: boolean,
  file: File | null,
  setFile: (file: File) => void
}


export const useProfileStore = create<IProfileStore>()(
  devtools(
    (set) => ({
      show: false,
      file: null,
      setFile: (file: File) => set(() => ({
        file
      }), false, "auth/setFile"),
      setShow: (show: boolean) => set(() => ({
        show
      }), false, "auth/setShow"),
    }), { name: "profile" })
)
