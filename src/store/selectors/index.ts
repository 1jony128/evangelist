import {StoreSchema} from 'store/useStore';


export const selectGroups = (state: StoreSchema) => state.groups
export const selectCurrentGroup = (state: StoreSchema) => state.groups.find(item => item.id === state.currentId)
export const selectAbout = (state: StoreSchema) => selectCurrentGroup(state)?.about
export const selectReviews = (state: StoreSchema) => selectCurrentGroup(state)?.reviews
export const selectPlaces = (state: StoreSchema) => selectCurrentGroup(state)?.places
export const selectContacts = (state: StoreSchema) => selectCurrentGroup(state)?.contacts
export const selectName = (state: StoreSchema) => selectCurrentGroup(state)?.name
export const selectBandMembers = (state: StoreSchema) => selectCurrentGroup(state)?.band_members
export const selectGrammotes = (state: StoreSchema) => selectCurrentGroup(state)?.grammotes
