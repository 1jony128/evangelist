import cls from "./Dialog.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getScreenArea, getStreetData, getTouchCoords} from 'widgets/MainLayout/Map/models/selectors/map';
import Title from 'antd/lib/typography/Title';
import {Button} from 'antd';
import {ObjectManager} from 'yandex-maps';

import {FormSavePoint} from 'features/FormSavePoint';
import {CloseOutline} from 'antd-mobile-icons';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {MapActions} from 'widgets/MainLayout/Map/models/slices/MapSlice';
import {IPoint} from 'widgets/MainLayout/Map/models/types/IPoint';

interface DialogProps {
    className?: string
    objectManager: ObjectManager | null
    map:  ymaps.Map | null
}

const Dialog: FC<DialogProps> = ({className, objectManager, map}) => {

    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

    const streetData = useSelector(getStreetData)
    const touchCoords = useSelector(getTouchCoords)
    const screenArea = useSelector(getScreenArea)

    const dispatch = useAppDispatch()



    useEffect(() => {
        if(streetData.length > 0 && objectManager && map && touchCoords && open) {
            onClose()
        }
    }, [screenArea])

    useEffect(() => {
        if(streetData.length > 0 && objectManager && map && touchCoords){
            setOpen(true)

            const {geo_lat, geo_lon, fias_id} = streetData[0.].data

            const coords = [
                +geo_lat + 0.0000180,
                +geo_lon + 0.0000180
            ]
            map.setCenter(coords)

            const point: IPoint = {
                type: "Feature",
                id: fias_id,
                geometry: {
                    type: "Point",
                    coordinates: coords
                } ,
                options: {
                    preset: 'islands#blueCircleDotIconWithCaption'
                }
            }

            dispatch(MapActions.setPoints(point))

        }
    },[streetData])

    const onShow = () => {
        setShow(!show)
    }

    const onClose = () => {
        const {fias_id} = streetData[0.].data
        dispatch(MapActions.removePoint(fias_id))
        setOpen(false)
    }

    if(streetData.length > 0 && open)
    return (
        <div
            className={classNames(cls.Dialog, {[cls.show]: show}, [className])}
        >
            {
                show
                ? <FormSavePoint data={streetData[0]}onClose={onShow}/>
                :
                    <>
                        <div className={cls.header}>
                            <Title level={4} className={cls.address}>
                                {`ул. `}  {streetData[0].data.street}, {`д. `}{streetData[0].data.house}
                            </Title>
                            <Button
                                onClick={onClose}
                                type={'text'}
                                className={cls.button}
                            >
                                <CloseOutline className={cls.close} onClick={onClose}/>
                            </Button>

                        </div>

                        <Button
                            onClick={onShow}
                            type="primary"
                            className={cls.button}
                        >
                            Заполнить данные
                        </Button>
                    </>
            }

        </div>
    );

    return null
};

export default Dialog;