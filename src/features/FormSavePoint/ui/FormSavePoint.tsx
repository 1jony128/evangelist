import cls from "./FormSavePoint.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {CloseOutline} from 'antd-mobile-icons';
import Title from 'antd/lib/typography/Title';
import {Input} from 'antd-mobile';
import {Street} from 'widgets/MainLayout/Map/models/types/Street';
import {Button} from 'antd';
interface FormSavePointProps {
    className?: string
    onClose: () => void
    data: Street
}

const FormSavePoint: FC<FormSavePointProps> = ({className, onClose, data}) => {

    const onSubmit = () => {

    }

    return (
        <div className={classNames(cls.FormSavePoint, {}, [className])}>
            <div className={cls.header}>
                <Title level={4}>Заполнение данных</Title>
                <CloseOutline className={cls.close} onClick={onClose}/>
            </div>
            <div className={cls.content}>
                <Input
                    value={"Шевцов Евгений"}
                    className={cls.input}
                />
                <Input
                    value={data.value}
                    className={cls.input}
                />
            </div>
            <div className={cls.footer}>
                <Button
                    onClick={onSubmit}
                    type="primary"
                    className={cls.button}
                >
                    Сохранить данные
                </Button>
            </div>
        </div>
    );
};

export default FormSavePoint;