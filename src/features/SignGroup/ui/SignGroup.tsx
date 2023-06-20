import cls from "./SignGroup.module.scss";
import { classNames } from "shared/lib/classNames";
import { FC, useEffect, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useInput from "shared/hooks/useInput";
import { alert } from "shared/lib/alerts";
import { useMutation, useQueryClient } from "react-query";
import { GroupServices } from "entities/Group/models/services/GroupServices";

interface SignGroupProps {
  className?: string;
}

const SignGroup: FC<SignGroupProps> = ({ className }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const client = useQueryClient();

  const accessKey = useInput("");

  const { mutate, error, isLoading } = useMutation(
    "signGroup",
    GroupServices.signGroup,
    {
      onSuccess: (newPoint) => {
        alert("Группа добавлена!", "success");

        client.invalidateQueries("allGroups").then((r) => r);
      },
      onError: (error: any) => {
        console.log(error);
        // @ts-ignore
        alert(error.message, "error");
      },
    }
  );

  const onSubmit = () => {
    if (accessKey.value === "") {
      console.log("ss");
      accessKey.setError("Поле не может быть пустым");
      accessKey.setHover(true);
      return;
    }
    mutate({
      userId: Number(localStorage.getItem("user_id")),
      access_key: accessKey.value,
    });

    accessKey.setValue("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      accessKey.clear();
    }
  }, [isOpen]);

  console.log(accessKey.hover);

  return (
    <div className={classNames(cls.SignGroup, {}, [className])}>
      <Button ref={btnRef} colorScheme={"blue"} onClick={onOpen}>
        Вступить в группу
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Вступление в группу</DrawerHeader>

          <DrawerBody>
            <Text padding={"2"}>Введите ключ группы.</Text>
            <Input
              isInvalid={!!accessKey.error && accessKey.hover}
              value={accessKey.value}
              onChange={accessKey.onChange}
              placeholder="Ключ группы..."
              onBlur={accessKey.onBlur}
              onFocus={accessKey.onFocus}
            />
            {!!accessKey.error && accessKey.hover && (
              <Text color={"red"} fontSize={"smaller"}>
                {accessKey.error}
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Отмена
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              Вступить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SignGroup;
