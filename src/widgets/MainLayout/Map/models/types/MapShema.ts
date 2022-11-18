import {ObjectManager} from 'yandex-maps';
import {IPoint} from 'widgets/MainLayout/Map/models/types/IPoint';
import {Street, StreetData} from 'widgets/MainLayout/Map/models/types/Street';


export interface MapShema {
    isLoading: boolean,
    error: string | null,
    coordinates: {
        screenArea: number[][] | null // geo, захватываемая область экрана
        touchCoords: number[] | null // нажатие на карту. [50.30787631729209, 127.55092794232424]
    },
    points: IPoint[] // точки на карте
    selectPoint: string | null // selectId выбранная точка на карте.
    streetData: Street[]
}