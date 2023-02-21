import cls from "./AddPointForm.module.scss";
import { classNames } from "shared/lib/classNames";
import { FC, useEffect, useMemo, useState } from "react";
import MyDrawer from "shared/ui/MyDrawer/MyDrawer";
import { useMapStore } from "entities/Map/models/store/MapStore";
import {
  getPoints,
  getSetPoints,
  getStreetData,
  getTouchCoords, selectComment, selectSetComment,
} from 'entities/Map/models/selectors/mapSelectors';
import { ObjectManager } from "yandex-maps";
import { IPoint } from "entities/Point/models/types/point";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HStack, VStack } from "shared/ui/Stack";
import { useAddPointStore } from "features/AddPointForm/models/store/addPointStore";
import {
  getFio,
  getIsOpen,
  getSetClose, getSetFio,
  getSetOpen,
} from 'features/AddPointForm/models/selectors/addPointSelectors';
import InputNumber from "shared/ui/InputNumber/InputNumber";
import useInput from "shared/hooks/useInput";
import AutoSelect, {Option} from 'shared/ui/AutoSelect/AutoSelect';
import useAddPoint from 'features/AddPointForm/models/hooks/useAddPoint';
import Loader from "shared/ui/Loader/Loader";
import {SingleValue} from 'react-select';
import useProfile from 'app/hooks/useProfile';

interface DialogPointProps {
  className?: string;
  objectManager: ObjectManager | null;
  map: ymaps.Map | null;
}

const AddPointForm: FC<DialogPointProps> = ({
  className,
  objectManager,
  map,
}) => {
  const streetData = useMapStore(getStreetData);
  const touchCoords = useMapStore(getTouchCoords);
  const setPoints = useMapStore(getSetPoints);
  const points = useMapStore(getPoints);

  const comment = useMapStore(selectComment);
  const setComment = useMapStore(selectSetComment);

  const isOpen = useAddPointStore(getIsOpen);
  const setClose = useAddPointStore(getSetClose);

  const fio = useAddPointStore(getFio);
  const setFio = useAddPointStore(getSetFio)

  const [count, setCount] = useState(25);

  const {isLoading, onSubmit, error} = useAddPoint({count})

  console.log(isOpen)

  useEffect(() => {
    if (isOpen) {
      const { geo_lat, geo_lon, fias_id } = streetData[0].data;

      const coords = [+geo_lat + 0.000018, +geo_lon + 0.000018];

      // const point: IPoint = {
      //   type: "Feature",
      //   id: fias_id,
      //   geometry: {
      //     type: "Point",
      //     coordinates: coords
      //   } ,
      //   options: {
      //     preset: 'islands#blueCircleDotIconWithCaption'
      //   }
      // }
      //
      // setPoints([...points, point])
    }
  }, [isOpen]);

  const selectValue = (value: SingleValue<Option>) => {
    setFio({
      value: value!.label,
      id: value!.value
    })
  }


  return (
    <MyDrawer active={isOpen} setActive={setClose} header={"Создать метку"}>
      <VStack
        max
        align={"center"}
        justify={"center"}
        gap={"16"}
        className={cls.AddPointForm}
      >
        <HStack gap={"16"} max>
          <Text>Имя</Text>
          <AutoSelect
            isDisabled={false}
            // @ts-ignore
            value={fio?.value | ""}
            setValue={selectValue}
            label={"Имя раздающего"}
          />
        </HStack>
        <HStack gap={"16"}>
          <Text>Количество газет</Text>
          <InputNumber value={count} setValue={setCount} />
        </HStack>
        <HStack gap={"16"} max>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введите комментарий"
            size="lg"
            resize={"none"}
          />
        </HStack>
        <Loader active={isLoading}  />
        <Button onClick={onSubmit} colorScheme="green">Создать</Button>
      </VStack>
    </MyDrawer>
  );
};

export default AddPointForm;
