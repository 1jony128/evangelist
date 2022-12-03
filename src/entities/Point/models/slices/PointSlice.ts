import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PointShema} from 'entities/Point/types/point';


const initialState: PointShema = {
    isLoading: false,
    error: null,
    name: "",
    street: {
        coordinate: [],
        id: 0
    }
};

export const PointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        setScreenArea(state, {payload}: PayloadAction<number[][]>){

        }
    }
});
export const { actions: PointActions } = PointSlice;
export const { reducer: PointReducer } = PointSlice;