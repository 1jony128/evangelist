import {StateSchema} from 'app/providers/StoreProvider';


export const getScreenArea = (state: StateSchema) => state.map.coordinates.screenArea;
export const getTouchCoords = (state: StateSchema) => state.map.coordinates.touchCoords;
export const getSelectPoint = (state: StateSchema) => state.map.selectPoint;
export const getStreetData = (state: StateSchema) => state.map.streetData;
export const getPoints = (state: StateSchema) => state.map.points;