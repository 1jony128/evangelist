import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IPoint, Street, StreetData} from 'entities/Point/models/types/point';

export interface MapShema {
  comment: string
  coordinates: {
    screenArea: number[][] | null // geo, захватываемая область экрана
    touchCoords: number[] | null // нажатие на карту. [50.30787631729209, 127.55092794232424]
  },
  points: IPoint[] // точки на карте
  setComment: (payload: string) => void
  selectPoint: string | null // selectId выбранная точка на карте.
  streetData: Street[]
  setScreenArea: (payload: number[][]) => void
  setSelectPoint: (payload: string) => void
  setTouchCoords: (payload: number[]) => void
  setStreetData: (payload: StreetData) => void
  clearStreetData: () => void
  setPoints: (payload: IPoint[]) => void
}


export const useMapStore = create<MapShema>()(
  devtools(
    (set) => ({
      comment: "",
      coordinates: {
        screenArea: null,
        touchCoords: null
      },
      points: [],
      selectPoint: null,
      streetData: [],
      setComment: (comment: string) => set((state) => ({
        comment
      }), false, "map/setComment"),
      setScreenArea: (payload: number[][]) => set((state) => ({
        coordinates: {
          ...state.coordinates,
          screenArea: payload
        }
      }), false, "map/setScreenArea"),
      setSelectPoint: (payload: string) => set((state) => ({
        selectPoint: payload
      }), false, "map/setSelectPoint"),
      setTouchCoords: (payload: number[]) => set((state) => ({
        coordinates: {
          ...state.coordinates,
          touchCoords: payload
        }
      }), false, "map/setTouchCoords"),
      setStreetData: (streetData: StreetData) => set((state) => ({
        streetData: streetData.suggestions
      }), false, "map/setStreetData"),
      clearStreetData: () => set((state) => ({
        streetData: []
      }), false, "map/clearStreetData"),
      setPoints: (points: IPoint[]) => set((state) => ({
        points
      }), false, "map/setStreetData"),
    }), { name: "map" })
)
// setSelectPoint(state, {payload}: PayloadAction<string>){
//   state.selectPoint = payload
// }
