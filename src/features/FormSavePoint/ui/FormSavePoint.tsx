import cls from "./FormSavePoint.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {CloseOutline} from 'antd-mobile-icons';
import Title from 'antd/lib/typography/Title';
interface FormSavePointProps {
    className?: string
    onClose: () => void
}

const FormSavePoint: FC<FormSavePointProps> = ({className, onClose}) => {


    return (
        <div className={classNames(cls.FormSavePoint, {}, [className])}>
            <div className={cls.header}>
                <Title level={4}>Заполнение данных</Title>
                <CloseOutline className={cls.close} onClick={onClose}/>
            </div>

        </div>
    );
};

export default FormSavePoint;