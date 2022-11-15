import cls from "./LoginLayout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {getIsRegistration } from 'entities/FormLogin/models/selectors/login';
import {useSelector} from 'react-redux';
import {FormLogin} from 'entities/FormLogin';

interface LoginLayoutProps {
    className?: string
}

const LoginLayout: FC<LoginLayoutProps> = ({className}) => {



    return (
        <div className={classNames(cls.LoginLayout, {}, [className])}>
            <FormLogin />
        </div>
    );
};

export default LoginLayout;