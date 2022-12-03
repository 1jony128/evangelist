import cls from "./LoginPage.module.scss"

import {FC} from "react";
import {classNames} from 'shared/lib/classNames/classNames';
import {LoginLayout} from 'widgets/LoginLayout';
import useAuth from 'pages/LoginPage/model/useAuth';


interface LoginPageProps {
    className?: string
}

const LoginPage: FC<LoginPageProps> = ({className}) => {

    useAuth()

    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>
           <LoginLayout />
        </div>
    );
};

export default LoginPage;
