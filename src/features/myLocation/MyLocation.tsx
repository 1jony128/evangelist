import cls from './MyLocation.module.scss';
import {classNames} from 'shared/lib/classNames';
import {FC, useEffect} from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {useMap, useMapEvents} from 'react-leaflet';
import {useMapStore} from 'entities/Map/models/store/MapStore';
import {selectPosition, selectSetPosition,} from 'entities/Map/models/selectors/mapSelectors';
import {LatLngExpression} from 'leaflet';
import {createPortal} from 'react-dom';
import {Tooltip} from '@chakra-ui/react';

interface MyLocationProps {
  className?: string;
}

const MyLocation: FC<MyLocationProps> = ({ className }) => {
  const map = useMap();
  const setPosition = useMapStore(selectSetPosition);
  const position = useMapStore(selectPosition);

  useEffect(() => {
    document.body.addEventListener("push", () => {
      document.body.innerText = "hello";
    });
  }, []);

  const mapEvent = useMapEvents({
    locationfound(e) {
      setTimeout(() => {
        console.log(e.latlng);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }, 100);
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords);
      const data: LatLngExpression = {
        lat: coords.latitude,
        // @ts-ignore
        lon: coords.longitude,
      };
      setPosition(data);
    });
    map.locate()
  }, [map]);

  const onClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    map.locate()
  };
  return (
    <>
      {createPortal(
        <Tooltip label={"Местоположение"}>
          <div className={classNames(cls.MyLocation, {}, [])}>
            <MyLocationIcon onClick={onClick} />
          </div>
        </Tooltip>,
        document.getElementById("location") as HTMLDivElement
      )}
    </>
  );
};

export default MyLocation;
