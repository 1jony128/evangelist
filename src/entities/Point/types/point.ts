import {InitialDispatch} from 'app/types';


export interface PointShema extends InitialDispatch{
    name: string,
    street: {
        coordinate: number[][],
        id: number
    }
}