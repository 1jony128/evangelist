import cls from "./Map.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import useWindowDimensions from 'shared/lib/hooks/useWindowDimension';
import usePoint from 'entities/Map/models/hooks/usePoint';
import useObjectManager from 'entities/Map/models/hooks/useObjectManager';

interface MapProps {
    className?: string,
    map:  ymaps.Map | null
    objectManager: ymaps.ObjectManager | null
}

const Map: FC<MapProps> = ({className,map,objectManager}) => {

  const { height, width } = useWindowDimensions();

  usePoint({objectManager})
  useObjectManager({objectManager,map})

    return (
      <div
        id="map-id"
        className={classNames(cls.Map, {}, [className])}
        style={{width: width, height: height - 60}}
      >

      </div>
    );
};

export default Map;
