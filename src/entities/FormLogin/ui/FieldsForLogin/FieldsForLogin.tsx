import cls from "./FieldsForLogin.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import Header from 'entities/FormLogin/ui/Header/Header';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {loginActions} from 'entities/FormLogin/models/slices/LoginSlice';
import {alert, alertText} from 'shared/lib/alerts';
import {useSelector} from 'react-redux';
import {
    getAccessKey,
    getLogin,
    getName,
    getPassword,
    getRepeatPassword
} from 'entities/FormLogin/models/selectors/login';
import {Button, Input} from 'antd';

interface FieldsForLoginProps {
    className?: string
}

const FieldsForLogin: FC<FieldsForLoginProps> = ({className}) => {

    const dispatch = useAppDispatch()

    const login = useSelector(getLogin)
    const password = useSelector(getPassword)

    const onRegister = () => {
        dispatch(loginActions.changeIsRegistration(true))
    }

    const onChange = (value: string, key: string) => {
        dispatch(loginActions.changeForm({value, key}))
    }

    const validation = () => {
        let errors = 0
        if(login === ""){
            console.log("bug")
            alert(alertText.passwordEmpty, "error")
            errors++
        }
        if(password === ""){
            console.log("bug")
            alert(alertText.passwordEmpty, "error")
            errors++
        }

        return errors > 0;

    }

    const onSubmit = () => {
        if(validation()) return
        dispatch(loginActions.loginSuccess())
        alert(alertText.successLogin, "success")
    }
    return (
        <div className={classNames(cls.FieldsForLogin, {}, [className])}>
            <Header title={"Вход"}/>
            <Input
                value={login}
                maxLength={20}
                className={cls.input}
                placeholder="Введите логин"
                onChange={(e) => onChange(e.target.value, "login")}
            />
            <Input.Password
                value={password}
                placeholder="Введите пароль"
                className={cls.input}
                maxLength={20}
                onChange={(e) => onChange(e.target.value, "password")}
            />
            <Button
                type="primary"
                className={cls.input}
                onClick={onSubmit}
            >
                Войти
            </Button>
            <Button
                onClick={onRegister}
            >
                Зарегистрироваться
            </Button>
        </div>
    );
};

export default FieldsForLogin;