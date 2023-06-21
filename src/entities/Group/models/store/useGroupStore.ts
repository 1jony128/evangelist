import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IGroup} from '@/entities/Group/models/types';

export interface GroupsSchema {
  groups: IGroup[] | null
  setGroups: (payload: IGroup[]) => void
  currentGroup: IGroup | null,
  setCurrentGroup: (payload: IGroup) => void
}


export const useGroupsStore = create<GroupsSchema>()(
  devtools(
    (set) => ({
      groups: null,
      setGroups: (groups) => set((state) => ({
        groups
      }), false, "group/setGroups"),
      currentGroup: null,
      setCurrentGroup: (currentGroup) => set((state) => ({
        currentGroup
      }), false, "group/setCurrentGroup"),
    }), { name: "group" })
)
