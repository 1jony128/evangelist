import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {MapShema} from 'widgets/MainLayout/Map/models/types/MapShema';
import {ObjectManager} from 'yandex-maps';
import {IPoint} from 'widgets/MainLayout/Map/models/types/IPoint';
import {getStreetData} from 'widgets/MainLayout/Map/models/services/getStreet';
import {Street, StreetData} from 'widgets/MainLayout/Map/models/types/Street';


const initialState: MapShema = {
    isLoading: false,
    error: null,
    coordinates: {
        screenArea: null,
        touchCoords: null
    },
    points: [],
    selectPoint: null,
    streetData: []
};

export const MapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setScreenArea(state, {payload}: PayloadAction<number[][]>){
            state.coordinates.screenArea = payload
        },
        setTouchCoords(state, {payload}: PayloadAction<number[]>){
            state.coordinates.touchCoords = payload
        },
        setPoints(state, {payload}: PayloadAction<IPoint[]>){
            state.points = payload
        },
        setSelectPoint(state, {payload}: PayloadAction<string>){
            state.selectPoint = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStreetData.pending, (state) => {
                state.streetData = []
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getStreetData.fulfilled, (state, {payload}: PayloadAction<StreetData>) => {
                state.isLoading = false;
                state.streetData = payload.suggestions;
            })
            .addCase(getStreetData.rejected, (state, action) => {
                state.isLoading = false;
                state.streetData = []
            });

    }
});

// Action creators are generated for each case reducer function
export const { actions: MapActions } = MapSlice;
export const { reducer: MapReducer } = MapSlice;