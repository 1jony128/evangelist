import cls from "./InputFile.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {EditIcon} from '@chakra-ui/icons';

interface InputFileProps {
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFile: FC<InputFileProps> = ({className, onChange}) => {
    return (
        <div className={classNames(cls.InputFile, {}, [className])}>
          <label htmlFor="inputFile">
            <EditIcon />
          </label>
          <input type="file" id={'inputFile'} onChange={onChange} />
        </div>
    );
};

export default InputFile;
