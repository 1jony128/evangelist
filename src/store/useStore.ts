import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IGroup} from 'types';

export interface MapShema {
  groups: IGroup[]
  setGroups: (payload: IGroup[]) => void
}


export const useMapStore = create<MapShema>()(
  devtools(
    (set) => ({
      groups: [],
      setGroups: (groups: IGroup[]) => set((state) => ({
        groups
      }), false, "map/setGroups"),
    }), { name: "map" })
)
