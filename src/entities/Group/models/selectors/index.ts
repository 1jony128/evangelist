import {GroupsSchema} from 'entities/Group/models/store/useGroupStore';


export const selectGroups = (state: GroupsSchema) => state.groups
export const selectSetGroups = (state: GroupsSchema) => state.setGroups
export const selectCurrentGroup = (state: GroupsSchema) => state.currentGroup
export const selectSetCurrentGroup = (state: GroupsSchema) => state.setCurrentGroup
