import {useState, useEffect, useCallback} from 'react';
import {IPoint} from 'widgets/MainLayout/Map/models/types/IPoint';
import {ObjectManager} from 'yandex-maps';
import {useSelector} from 'react-redux';
import {getPoints, getTouchCoords} from 'widgets/MainLayout/Map/models/selectors/map';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {MapActions} from 'widgets/MainLayout/Map/models/slices/MapSlice';
import {getStreetData} from 'widgets/MainLayout/Map/models/services/getStreet';

interface usePointProps {
    objectManager: ObjectManager | null
}

const usePoint = ({objectManager}: usePointProps) => {

    const points = useSelector(getPoints)
    const touchCoords = useSelector(getTouchCoords)


    const dispatch = useAppDispatch()


    const addEventOM = useCallback(() => {
        if(objectManager){
            objectManager.objects.events.add('click', (e) => {
                const selectId = e.get('objectId')
                dispatch(MapActions.setSelectPoint(`${selectId}`))
            });
        }
    },[objectManager, points])




    useEffect(() => {
        if(touchCoords) {
            console.log(touchCoords)
            dispatch(getStreetData())
        }

    }, [touchCoords])


    useEffect(addEventOM, [objectManager, points])

};

export default usePoint;