import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IGroup} from 'types';

export interface StoreSchema {
  groups: IGroup[]
  setGroups: (payload: IGroup[]) => void
  currentId: string
  setId: (currentId: string) => void
}


export const useStore = create<StoreSchema>()(
  devtools(
    (set) => ({
      currentId: "1",
      groups: [],
      setGroups: (groups: IGroup[]) => set((state) => ({
        groups
      }), false, "map/setGroups"),
      setId: (currentId: string) => set((state) => ({
        currentId
      }), false, "map/setId"),
    }), { name: "map" })
)
