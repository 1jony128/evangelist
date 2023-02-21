import {useState, useEffect, useCallback} from 'react';
import {ObjectManager} from 'yandex-maps';
import {useMapStore} from 'entities/Map/models/store/MapStore';
import {useMutation, useQuery} from 'react-query';
import {AuthService} from 'features/AuthByEmail/models/services/auth';
import {alert} from 'shared/lib/alerts';
import {MapServices} from 'entities/Map/models/services/mapServices';
import {
  getPoints,
  getSelectPoint, getSetPoints, getSetSelectPoint,
  getSetStreetData,
  getStreetData,
  getTouchCoords
} from 'entities/Map/models/selectors/mapSelectors';
import {AutoSelectService} from 'shared/ui/AutoSelect/services/autoSelect';
import {PointServices} from 'entities/Point/models/services/PointServices';
import {IGetPoint, IPoint} from 'entities/Point/models/types/point';
import setPointTransform from 'entities/Map/models/lib/setPointTransform';

interface usePointProps {
    objectManager: ObjectManager | null
}

const usePoint = ({objectManager}: usePointProps) => {
  const points = useMapStore(getPoints)
  const touchCoords = useMapStore(getTouchCoords)
  const setSelectPoint = useMapStore(getSetSelectPoint)
  const setStreetData = useMapStore(getSetStreetData)
  const streetData = useMapStore(getStreetData)
  const setPoints = useMapStore(getSetPoints);

  console.log(points)

  const allPoints = useQuery('allPoints', () => PointServices.AllPoints(), {
    onSuccess:({data}) => {
      setPoints(data)
    },
    select: ({data}) => data.map((item: IGetPoint) => setPointTransform(item))
  })

  console.log(allPoints.data)

  useEffect(() => {
    if(allPoints){
      // @ts-ignore
      setPoints(allPoints.data)
    }
  },[allPoints.data])

  const {mutate, error, isLoading}  = useMutation('authByEmail', MapServices.getStreetData, {
    onSuccess: (data) => {
      if(data.data.suggestions.length > 1){
        setStreetData(data.data)
      }
    },
    onError: (error: any) => {
      alert(error.message, 'error')
    }
  })

    const addEventOM = useCallback(() => {
        if(objectManager){
            objectManager.objects.events.add('click', (e) => {
                const selectId = e.get('objectId')
                setSelectPoint(`${selectId}`)
            });
        }
    },[objectManager, points])




    useEffect(() => {
        if(touchCoords) {
          console.log(touchCoords)
          mutate(touchCoords)
        }

    }, [touchCoords])


    useEffect(addEventOM, [objectManager, points])

};

export default usePoint;
