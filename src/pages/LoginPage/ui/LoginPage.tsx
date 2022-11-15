import cls from "./LoginPage.module.scss"

import {FC} from "react";
import {classNames} from 'shared/lib/classNames/classNames';
import {LoginLayout} from 'widgets/LoginLayout';


interface LoginPageProps {
    className?: string
}

const LoginPage: FC<LoginPageProps> = ({className}) => {
    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>
           <LoginLayout />
        </div>
    );
};

export default LoginPage;