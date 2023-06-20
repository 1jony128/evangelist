import { FC } from "react";
import useWindowDimensions from "shared/lib/hooks/useWindowDimension";
import usePoint from "entities/Map/models/hooks/usePoint";
import {
  CircleMarker,
  MapContainer,
  Popup,
  ScaleControl,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import InfoPoint from "pages/MapPage/InfoPoint/ui/InfoPoint";
import { useMapStore } from "entities/Map/models/store/MapStore";
import {
  getPoints,
  getSetTouchCoords,
  getStreetData,
  getTouchCoords,
  selectPosition,
} from "entities/Map/models/selectors/mapSelectors";
import MarkerEva from "entities/Map/ui/MarkerEva";
import { useGroupsStore } from "entities/Group/models/store/useGroupStore";
import { selectCurrentGroup } from "entities/Group/models/selectors";
import cls from "./Map.module.scss";
import MyLocation from "features/myLocation/MyLocation";

interface MapProps {
  className?: string;
}

interface MapHandlerProps {}

const MapHandler: FC<MapHandlerProps> = ({}) => {
  const setTouchCoords = useMapStore(getSetTouchCoords);
  const streetData = useMapStore(getStreetData);

  const map = useMap();

  const mapEvents = useMapEvents({
    click(event) {
      console.log(event);
      setTouchCoords([+event.latlng.lat, +event.latlng.lng]);
    },
  });

  return <></>;
};

const Map: FC<MapProps> = ({ className }) => {
  const { height, width } = useWindowDimensions();

  const streetData = useMapStore(getStreetData);

  const currentGroup = useGroupsStore(selectCurrentGroup);

  usePoint({});

  const points = useMapStore(getPoints);
  const touchCoords = useMapStore(getTouchCoords);

  const position = useMapStore(selectPosition);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: height - 60, width }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <div className={cls.currentGroup}>
        {currentGroup?.name || "Группа не определена"}
      </div>
      <MyLocation />
      <MarkerClusterGroup chunkedLoading>
        {points &&
          points.map((item) => (
            <CircleMarker
              center={[+item.geo_lat, +item.geo_lon]}
              key={`${item.id}`}
              eventHandlers={{
                click: () => {
                  console.log("marker clicked");
                },
              }}
            >
              <Tooltip>
                <InfoPoint point={item} />
              </Tooltip>
              <Popup>
                <InfoPoint point={item} />
              </Popup>
            </CircleMarker>
          ))}
      </MarkerClusterGroup>
      {touchCoords && <MarkerEva />}
      <MapHandler />
      <ScaleControl />
    </MapContainer>
  );
};

export default Map;
