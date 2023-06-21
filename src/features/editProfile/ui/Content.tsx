import cls from "./EditProfile.module.scss";
import { classNames } from "@/shared/lib/classNames";
import React, { FC, useState } from "react";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Avatar, Button, Text } from "@chakra-ui/react";
import {
  selectFile,
  selectSetFile,
} from "@/features/editProfile/model/selectors";
import { useProfileStore } from "@/features/editProfile/model/store/useProfileStore";
import InputFile from "@/shared/ui/InputFile/InputFile";
import useEditAvatar from "@/features/editProfile/model/hooks/useEditAvatar";
import { useUserStore } from "@/entities/User/models/store/useUserStore";
import Loader from "@/shared/ui/Loader/Loader";
import { selectUser } from "@/entities/User/models/selectors";

interface ContentProps {
  className?: string;
}

const Content: FC<ContentProps> = ({ className }) => {
  const file = useProfileStore(selectFile);
  const setFile = useProfileStore(selectSetFile);
  const [preview, setPreview] = useState<string | null>(null);

  const { isLoading, error, mutate } = useEditAvatar();

  const user = useUserStore(selectUser);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const onSave = () => {
    if (!file) return;

    const form = new FormData();

    form.append("image", file);
    mutate({ id: `${user?.id}`, form });
  };

  return (
    <VStack
      className={classNames(cls.Content, {}, [className])}
      align={"center"}
      justify={"center"}
      gap={"16"}
    >
      <HStack>
        <Text>Изменить аватар</Text>
        <InputFile onChange={onChange} className={cls.InputFile} />
      </HStack>
      {preview && <Avatar src={preview} size="2xl" />}
      {preview && (
        <Button onClick={onSave} colorScheme={"telegram"}>
          Сохранить
        </Button>
      )}
      <Loader active={isLoading} />
    </VStack>
  );
};

export default Content;
