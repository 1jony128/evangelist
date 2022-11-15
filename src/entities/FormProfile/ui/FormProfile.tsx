import cls from "./FormProfile.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {Button, Input} from 'antd';
import {loginActions} from 'entities/FormLogin/models/slices/LoginSlice';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useSelector} from 'react-redux';
import {getName, getNewPassword, getRepeatPassword} from 'entities/FormProfile/models/selectors/profile';
import {alert, alertText} from 'shared/lib/alerts';

interface FormProfileProps {
    className?: string
}

const FormProfile: FC<FormProfileProps> = ({className}) => {

    const dispatch = useAppDispatch()

    const name = useSelector(getName)
    const newPassword = useSelector(getNewPassword)
    const repeatPassword = useSelector(getRepeatPassword)


    const onChange = (value: string, key: string) => {
        dispatch(loginActions.changeForm({value, key}))
    }

    const validation = () => {
        let errors = 0
        if(newPassword !== repeatPassword){
            console.log("bug")
            alert(alertText.passwordDontMatch, "error")
            errors++
        }
        if(name === ""){
            console.log("bug")
            alert(alertText.passwordEmpty, "error")
            errors++
        }
        if(newPassword === ""){
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
        <div className={classNames(cls.FormProfile, {}, [className])}>
            <Input
                value={name}
                maxLength={20}
                className={cls.input}
                placeholder="Изменить имя"
                onChange={(e) => onChange(e.target.value, "name")}
            />
            <Input.Password
                value={newPassword}
                placeholder="Ввести новый пароль"
                className={cls.input}
                maxLength={20}
                onChange={(e) => onChange(e.target.value, "new_password")}
            />
            <Input.Password
                value={repeatPassword}
                placeholder="Повторите пароль"
                className={cls.input}
                maxLength={20}
                onChange={(e) => onChange(e.target.value, "new_password")}
            />
            <Button
                type="primary"
                className={cls.input}
                onClick={onSubmit}
            >
                Сохранить данные
            </Button>
        </div>
    );
};

export default FormProfile;