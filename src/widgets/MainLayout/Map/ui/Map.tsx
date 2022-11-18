import cls from "./Map.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useEffect, useState} from 'react';
import useWindowDimensions from 'shared/hooks/useWindowDimension';
import useInitMap from 'widgets/MainLayout/Map/models/hooks/useInitMap';
import useObjectManager from 'widgets/MainLayout/Map/models/hooks/useObjectManager';
import usePoint from 'widgets/MainLayout/Map/models/hooks/usePoint';
import {HEIGHT_FOOTER} from 'shared/const/map';

interface MapProps {
    className?: string
    map:  ymaps.Map | null
    objectManager: ymaps.ObjectManager | null
}

const Map: FC<MapProps> = ({className, map, objectManager}) => {


    const { height, width } = useWindowDimensions();

    usePoint({objectManager})
    useObjectManager({objectManager,map})

    return (
        <div
            id="map-id"
            className={classNames(cls.Map, {}, [className])}
            style={{width: width, height: height - HEIGHT_FOOTER}}
        >

        </div>
    );
};

export default Map;