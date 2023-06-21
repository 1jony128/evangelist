import cls from './AddPointForm.module.scss';
import {FC, useEffect} from 'react';
import MyDrawer from '@/shared/ui/MyDrawer/MyDrawer';
import {useMapStore} from '@/entities/Map/models/store/MapStore';
import {getStreetData} from '@/entities/Map/models/selectors/mapSelectors';
import {Button, Text, Textarea} from '@chakra-ui/react';
import {HStack, VStack} from '@/shared/ui/Stack';
import {useAddPointStore} from '@/features/AddPointForm/models/store/addPointStore';
import {
  selectAddress,
  selectComment,
  selectCount,
  selectFio,
  selectIsOpen,
  selectMode,
  selectSetAddress,
  selectSetClose, selectSetComment,
  selectSetCount,
  selectSetFio,
} from '@/features/AddPointForm/models/selectors/addPointSelectors';
import InputNumber from '@/shared/ui/InputNumber/InputNumber';
import AutoSelect, {Option} from '@/shared/ui/AutoSelect/AutoSelect';
import useAddPoint from '@/features/AddPointForm/models/hooks/useAddPoint';
import Loader from '@/shared/ui/Loader/Loader';
import {SingleValue} from 'react-select';
import {AddressSuggestions,} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import useInitEditMode from '@/features/AddPointForm/models/hooks/useInitEditMode';

interface DialogPointProps {
  className?: string;
}

const AddPointForm: FC<DialogPointProps> = ({ className }) => {
  const mode = useAddPointStore(selectMode);

  const streetData = useMapStore(getStreetData);

  const comment = useAddPointStore(selectComment);
  const setComment = useAddPointStore(selectSetComment);

  const isOpen = useAddPointStore(selectIsOpen);
  const setClose = useAddPointStore(selectSetClose);

  const fio = useAddPointStore(selectFio);
  const setFio = useAddPointStore(selectSetFio);

  const address = useAddPointStore(selectAddress);
  const setAddress = useAddPointStore(selectSetAddress);

  const count = useAddPointStore(selectCount);
  const setCount = useAddPointStore(selectSetCount);

  useInitEditMode();

  const { isLoading, onSubmit, error } = useAddPoint();

  const selectValue = (value: SingleValue<Option>) => {
    setFio({
      value: value!.label,
      id: value!.value,
    });
  };

  useEffect(() => {
    if (mode === "create" && streetData) {
      setAddress(
        `ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`
      );
    } else {
      if (mode === "create") {
        setAddress(`Благовещенск`);
      }
    }
  }, [mode, streetData]);

  return (
    <MyDrawer
      active={isOpen}
      setActive={setClose}
      header={mode === "create" ? "Создать метку" : "Редактировать метку"}
    >
      <VStack
        max
        align={"center"}
        justify={"center"}
        gap={"16"}
        className={cls.AddPointForm}
      >
        <HStack gap={"16"} max>
          <Text>Адрес</Text>
          <AddressSuggestions
            token="02064c1ca019072ad521dd88b722db1019854ac2"
            value={typeof address === "string" ? undefined : address}
            onChange={setAddress}
            defaultQuery={
              typeof address === "string" ? address : "Благовещенск"
            }
            delay={500}
          />
        </HStack>
        <HStack gap={"16"} max>
          <Text>Имя</Text>
          <AutoSelect
            isDisabled={false}
            value={fio?.value || ""}
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
            placeholder="Комментарий: Номера подъездов, заметка т.д."
            size="lg"
            resize={"none"}
          />
        </HStack>
        <Loader active={isLoading} />
        <Button onClick={onSubmit} colorScheme="green">
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </VStack>
    </MyDrawer>
  );
};

export default AddPointForm;
