import cls from "./AddGroup.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {Button} from '@chakra-ui/react';

interface AddGroupProps {
    className?: string
}

const AddGroup: FC<AddGroupProps> = ({className}) => {
    return (
        <div className={classNames(cls.AddGroup, {}, [className])}>
           <Button colorScheme={'green'}>
             Создать группу
           </Button>
        </div>
    );
};

export default AddGroup;
