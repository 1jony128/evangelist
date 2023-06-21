import cls from "./InfoPoint.module.scss";
import { FC } from "react";
import { Button, Text } from "@chakra-ui/react";
import { VStack } from "@/shared/ui/Stack";
import { useAddPointStore } from "@/features/AddPointForm/models/store/addPointStore";
import { selectSetOpen } from "@/features/AddPointForm/models/selectors/addPointSelectors";
import { IPoint } from "@/entities/Point/models/types/point";

interface InfoPointProps {
  point: IPoint;
}

const InfoPoint: FC<InfoPointProps> = ({ point }) => {
  const setOpen = useAddPointStore(selectSetOpen);

  const onOpenForm = () => {
    setOpen("edit", point);
  };
  return (
    <>
      <VStack
        max
        align={"center"}
        justify={"center"}
        gap={"8"}
        className={cls.InfoPoint}
      >
        <Text fontSize="xl">{point.address}</Text>
        <Text fontSize="1xl">{point.user_name}</Text>
        <Text fontSize="1xl">{point.count} Газеты</Text>
        <Button colorScheme="green" onClick={onOpenForm} className={cls.Button}>
          Редактировать данные?
        </Button>
      </VStack>
    </>
  );
};

export default InfoPoint;
