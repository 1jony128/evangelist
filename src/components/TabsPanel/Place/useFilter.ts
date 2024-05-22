import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IGroup} from 'types';

export interface FilterSchema {
  filter: string
  setFilter: (payload: string) => void
}


export const useFilter = create<FilterSchema>()(
  devtools(
    (set) => ({
      currentId: "1",
      filter: "all",
      setFilter: (filter) => set((state) => ({
        filter
      }), false, "filter/setFilter"),
    }), { name: "filter" })
)
