import { useEffect, useCallback} from 'react';
import {ObjectManager} from 'yandex-maps';
import {useMapStore} from 'entities/Map/models/store/MapStore';

interface useObjectManagerProps {
    objectManager: ObjectManager | null
    map:  ymaps.Map | null
}

const useObjectManager = ({objectManager, map}: useObjectManagerProps) => {

  const points = useMapStore(state => state.points)
  const setScreenArea = useMapStore(state => state.setScreenArea)
  const setTouchCoords = useMapStore(state => state.setTouchCoords)

    const updateOM = useCallback(() => {
      console.log(points)
      console.log(objectManager)
        if(points && points.length){
            if(objectManager){
                objectManager.removeAll();
                objectManager.add({
                    "type": "FeatureCollection",
                    "features": points
                })
            }
        } else {
            if(objectManager) {
                objectManager.removeAll();
            }
        }
    }, [points, objectManager])



    const setCoordinate = () => {
        if (!map) return;
        map.events.add('boundschange', () => {
            setScreenArea(map.getBounds());
        });
        map.events.add('click', function (e) {
            const coords = e.get('coords');
            setTouchCoords(coords)
        });
    }

    useEffect(setCoordinate,[map, points])
    useEffect(updateOM,[points, objectManager])

    return {}
};

export default useObjectManager;
