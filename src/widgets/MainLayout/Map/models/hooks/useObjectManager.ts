import { useEffect, useCallback} from 'react';
import {ObjectManager} from 'yandex-maps';
import {MapActions} from 'widgets/MainLayout/Map/models/slices/MapSlice';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useSelector} from 'react-redux';
import {getPoints} from 'widgets/MainLayout/Map/models/selectors/map';

interface useObjectManagerProps {
    objectManager: ObjectManager | null
    map:  ymaps.Map | null
}

const useObjectManager = ({objectManager, map}: useObjectManagerProps) => {

    const points = useSelector(getPoints)

    const dispatch = useAppDispatch()

    const updateOM = useCallback(() => {
        if(points && points.length){
            if(objectManager){
                objectManager.removeAll();
                objectManager.add({
                    "type": "FeatureCollection",
                    "features": points
                })
            }

        }
    }, [points, objectManager])



    const setCoordinate = () => {
        if (!map) return;
        map.events.add('boundschange', () => {
            dispatch(MapActions.setScreenArea(map.getBounds()));
        });
        map.events.add('click', function (e) {
            const coords = e.get('coords');
            dispatch(MapActions.setTouchCoords(coords))
        });
    }

    useEffect(setCoordinate,[map, points])
    useEffect(updateOM,[points])

    return {}
};

export default useObjectManager;