import cls from "./DialogPoint.module.scss";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useMapStore } from "entities/Map/models/store/MapStore";
import {
  getClearStreetData,
  getPoints,
  getSetPoints,
  getStreetData,
  getTouchCoords,
} from "entities/Map/models/selectors/mapSelectors";
import { ObjectManager } from "yandex-maps";
import { Button, Text, useOutsideClick } from "@chakra-ui/react";
import { VStack } from "shared/ui/Stack";
import { useAddPointStore } from "features/AddPointForm/models/store/addPointStore";
import { getSetOpen } from "features/AddPointForm/models/selectors/addPointSelectors";

interface DialogPointProps {
  className?: string;
  objectManager: ObjectManager | null;
  map: ymaps.Map | null;
}

const DialogPoint: FC<DialogPointProps> = ({
  className,
  objectManager,
  map,
}) => {
  const streetData = useMapStore(getStreetData);
  const clearStreetData = useMapStore(getClearStreetData);
  const touchCoords = useMapStore(getTouchCoords);
  const setPoints = useMapStore(getSetPoints);
  const points = useMapStore(getPoints);

  const setOpen = useAddPointStore(getSetOpen);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsModalOpen(false);
      // clearStreetData();
    },
  });

  const activePopup = useMemo(
    () => !!(streetData.length > 0 && objectManager && map && touchCoords),
    [map, objectManager, streetData]
  );

  useEffect(() => {
    if (activePopup) {
      setIsModalOpen(true);
      const { geo_lat, geo_lon, fias_id } = streetData[0].data;

      const coords = [+geo_lat + 0.000018, +geo_lon + 0.000018];
      map!.setCenter(coords);
    }
  }, [activePopup, streetData]);

  const onOpenForm = () => {
    setOpen()
  }

  if (isModalOpen)
    return (
      <>
        <div className={cls.DialogPoint} ref={ref}>
          <VStack max align={"center"} justify={"center"} gap={"16"}>
            <Text fontSize="2xl">{`ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`}</Text>
            <Button colorScheme="blue" onClick={onOpenForm}>Заполнить данные?</Button>
          </VStack>
        </div>
        <div className={cls.triangle} />
      </>
    );

  return null;
};

export default DialogPoint;
