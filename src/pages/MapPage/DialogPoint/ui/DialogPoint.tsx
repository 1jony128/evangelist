import cls from './DialogPoint.module.scss';
import {FC} from 'react';
import {useMapStore} from '@/entities/Map/models/store/MapStore';
import {getStreetData,} from '@/entities/Map/models/selectors/mapSelectors';
import {Button, Text} from '@chakra-ui/react';
import {VStack} from '@/shared/ui/Stack';
import {useAddPointStore} from '@/features/AddPointForm/models/store/addPointStore';
import {selectSetOpen} from '@/features/AddPointForm/models/selectors/addPointSelectors';

interface DialogPointProps {
}

const DialogPoint: FC<DialogPointProps> = ({
}) => {
  const streetData = useMapStore(getStreetData);

  const setOpen = useAddPointStore(selectSetOpen);

  const onOpenForm = () => {
    setOpen('create');
  }
    if(streetData){
      return (
        <div className={cls.DialogPoint}>
          <VStack max align={"center"} justify={"center"} gap={"16"}>
            <Text fontSize="2xl">{`ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`}</Text>
            <Button colorScheme="blue" onClick={onOpenForm}>Заполнить данные</Button>
          </VStack>
        </div>
      );
    }


  return (
    <div className={cls.DialogPoint}>
      <VStack max align={"center"} justify={"center"} gap={"16"}>
        <Text fontSize="2xl">{'Адрес не определен'}</Text>
        <Button colorScheme="blue" onClick={onOpenForm}>Заполнить данные</Button>
      </VStack>
    </div>
  );
};

export default DialogPoint;
