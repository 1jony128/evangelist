import cls from './FieldsForReg.module.scss'
import {classNames} from 'shared/lib/classNames';
import {FC, useEffect} from 'react';
import Header from 'entities/FormLogin/ui/Header/Header';
import {Button, Input} from 'antd';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {loginActions} from 'entities/FormLogin/models/slices/LoginSlice';
import {useSelector} from 'react-redux';
import {
    getAccessKey,
    getError,
    getLogin,
    getName,
    getPassword,
    getRepeatPassword
} from 'entities/FormLogin/models/selectors/login';
import {alert, alertText} from 'shared/lib/alerts';
import {registrationUser} from 'entities/FormLogin/models/services/registrationUser';

interface FieldsForRegProps {
    className?: string
}

const FieldsForReg: FC<FieldsForRegProps> = ({className}) => {

    const dispatch = useAppDispatch()

    const name = useSelector(getName)
    const login = useSelector(getLogin)
    const accessKey = useSelector(getAccessKey)
    const password = useSelector(getPassword)
    const repeatPassword = useSelector(getRepeatPassword)
    const error = useSelector(getError)

    const onLogin = () => {
        dispatch(loginActions.changeIsRegistration(false))
    }

    const onChange = (value: string, key: string) => {
        dispatch(loginActions.changeForm({value, key}))
    }

    const validation = () => {
        let errors = 0
        if(password !== repeatPassword){
            console.log("bug")
            alert(alertText.passwordDontMatch, "error")
            errors++
        }
        if(login === ""){
            alert(alertText.loginEmpty, "error")
            errors++
        }
        if(name === ""){
            alert(alertText.nameEmpty, "error")
            errors++
        }
        if(accessKey === ""){
            alert(alertText.accessKeyEmpty, "error")
            errors++
        }
        if(repeatPassword === ""){
            alert(alertText.repeatPasswordEmpty, "error")
            errors++
        }
        if(password === ""){
            alert(alertText.passwordEmpty, "error")
            errors++
        }

        return errors > 0;
    }

    const onSubmit = () => {
        if(validation()) return
        dispatch(registrationUser({
            email: login,
            password: password
        }))
    }
    return (
        <div className={classNames(cls.FieldsForReg, {}, [className])}>
            <Header title={"Регистрация"}/>
            <Input
                value={login}
                maxLength={20}
                className={cls.input}
                placeholder="Введите логин"
                onChange={(e) => onChange(e.target.value, "login")}
            />
            <Input
                value={name}
                maxLength={20}
                className={cls.input}
                placeholder="Введите имя"
                onChange={(e) => onChange(e.target.value, "name")}
            />
            <Input
                value={accessKey}
                maxLength={20}
                className={cls.input}
                placeholder="Введите ключ доступа"
                onChange={(e) => onChange(e.target.value, "access_key")}
            />
            <Input.Password
                value={password}
                placeholder="Введите пароль"
                className={cls.input}
                maxLength={20}
                onChange={(e) => onChange(e.target.value, "password")}
            />
            <Input.Password
                value={repeatPassword}
                placeholder="Повторите пароль"
                className={cls.input}
                maxLength={20}
                onChange={(e) => onChange(e.target.value, "repeat_password")}
            />
            <Button
                type="primary"
                className={cls.input}
                onClick={onSubmit}
            >
                Зарегистрироваться
            </Button>
            <Button
                onClick={onLogin}
            >
                Войти
            </Button>

        </div>
    );
};

export default FieldsForReg;
