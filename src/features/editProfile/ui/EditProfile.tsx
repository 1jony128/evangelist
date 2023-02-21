import cls from "./EditProfile.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {HStack, VStack} from 'shared/ui/Stack';
import {Button} from '@chakra-ui/react';
import {EditIcon} from '@chakra-ui/icons';

interface EditProfileProps {
    className?: string
}

const EditProfile: FC<EditProfileProps> = ({className}) => {
    return (
        <VStack className={classNames(cls.EditProfile, {}, [className])}>

          <Button variant={'solid'} colorScheme={'green'}>
            <HStack gap={'16'}>
              <span>Редактировать профиль</span>
              <EditIcon color="white" boxSize={6} />
            </HStack>
          </Button>
        </VStack>
    );
};

export default EditProfile;
