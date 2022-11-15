import cls from "./Logout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useState} from 'react';
import {Button} from 'antd';
import {Modal, Toast} from 'antd-mobile';
import {sleep} from 'antd-mobile/es/utils/sleep';

interface LogoutProps {
    className?: string
}

const Logout: FC<LogoutProps> = ({className}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={classNames(cls.Logout, {}, [className])}>
            <Button
                className={cls.input}
                onClick={() =>
                    Modal.confirm({
                        content: 'Вы действительно хотите выйти из аккаунта?',
                        onConfirm: async () => {
                            await sleep(3000)
                            Toast.show({
                                icon: 'success',
                                content: 'Вы действительно хотите выйти из аккаунта?',
                                position: 'bottom',
                            })
                        },
                    })}
            >
                Выйти из аккаунта?
            </Button>
        </div>
    );
};

export default Logout;