import cls from "./Dialog.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getStreetData, getTouchCoords} from 'widgets/MainLayout/Map/models/selectors/map';
import Title from 'antd/lib/typography/Title';
import {Button} from 'antd';
import {ObjectManager} from 'yandex-maps';

import {FormSavePoint} from 'features/FormSavePoint';
import {CloseOutline} from 'antd-mobile-icons';

interface DialogProps {
    className?: string
    objectManager: ObjectManager | null
    map:  ymaps.Map | null
}

const Dialog: FC<DialogProps> = ({className, objectManager, map}) => {

    const [show, setShow] = useState(false)

    const streetData = useSelector(getStreetData)
    const touchCoords = useSelector(getTouchCoords)


    useEffect(() => {
        if(streetData.length > 0 && objectManager && map && touchCoords){
            map.setCenter(touchCoords)

            const point = {
                type: "Feature",
                id: (new Date()).getTime(),
                geometry: {
                    type: "Point",
                    coordinates: touchCoords
                } ,
                options: {
                    preset: 'islands#blueCircleDotIconWithCaption'
                }
            }
            objectManager.add({
                "type": "FeatureCollection",
                "features": [point]
            })
        }
    },[streetData])

    const onShow = () => {
        setShow(!show)
    }

    const onClose = () => {

    }

    if(streetData.length > 0)
    return (
        <div
            className={classNames(cls.Dialog, {[cls.show]: show}, [className])}
        >
            {
                show
                ? <FormSavePoint data={streetData[0]}onClose={onShow}/>
                :
                    <>
                        <CloseOutline className={cls.close} onClick={onClose}/>
                        <Title level={4} className={cls.address}>
                            {`ул. `}  {streetData[0].data.street}, {`д. `}{streetData[0].data.house}
                        </Title>
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