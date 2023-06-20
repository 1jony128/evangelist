import cls from "./EditProfile.module.scss";
import { classNames } from "shared/lib/classNames";
import { FC } from "react";
import { HStack, VStack } from "shared/ui/Stack";
import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
  selectSetShow,
  selectShow,
} from "features/editProfile/model/selectors";
import { useProfileStore } from "features/editProfile/model/store/useProfileStore";
import Content from 'features/editProfile/ui/Content';

interface EditProfileProps {
  className?: string;
}

const EditProfile: FC<EditProfileProps> = ({ className }) => {
  const show = useProfileStore(selectShow);
  const setShow = useProfileStore(selectSetShow);

  return (
    <VStack className={classNames(cls.EditProfile, {}, [className])} align={'center'} gap={'16'}>
      {show && <Content />}
      <Button
        onClick={() => setShow(!show)}
        variant={show ? "outline" : "solid"}
        colorScheme={show ? 'yellow' : "green"}
      >
        {
          show
            ? <span>Отмена</span>
            : <HStack gap={"16"}>
              <span>Редактировать профиль</span>
              <EditIcon color="white" boxSize={6} />
            </HStack>
        }

      </Button>
    </VStack>
  );
};

export default EditProfile;
