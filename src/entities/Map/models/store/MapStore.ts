import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {IPoint, Street, StreetData} from 'entities/Point/models/types/point';
import {LatLngExpression} from 'leaflet';

export interface MapShema {
  position: LatLngExpression
  setPosition: (payload: LatLngExpression) => void
  coordinates: {
    screenArea: number[][] | null // geo, захватываемая область экрана
    touchCoords: number[] | null // нажатие на карту. [50.30787631729209, 127.55092794232424]
  },
  points: IPoint[] // точки на карте

  selectPoint: string | null // selectId выбранная точка на карте.
  streetData: Street[]
  setScreenArea: (payload: number[][]) => void
  setSelectPoint: (payload: string) => void
  setTouchCoords: (payload: number[] | null) => void
  setStreetData: (payload: StreetData) => void
  clearStreetData: () => void
  setPoints: (payload: IPoint[]) => void
}


export const useMapStore = create<MapShema>()(
  devtools(
    (set) => ({
      position: [50.29693652129269, 127.53487760357913],
      setPosition: (position) => set((state) => ({
        position
      }), false, "map/setPosition"),
      coordinates: {
        screenArea: null,
        touchCoords: null
      },
      points: [],
      selectPoint: null,
      streetData: [],

      setScreenArea: (payload: number[][]) => set((state) => ({
        coordinates: {
          ...state.coordinates,
          screenArea: payload
        }
      }), false, "map/setScreenArea"),
      setSelectPoint: (payload: string) => set((state) => ({
        selectPoint: payload
      }), false, "map/setSelectPoint"),
      setTouchCoords: (payload: number[] | null) => set((state) => ({
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
