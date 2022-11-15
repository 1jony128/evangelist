import cls from "./FormLogin.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getIsRegistration} from 'entities/FormLogin/models/selectors/login';
import FieldsForReg from 'entities/FormLogin/ui/FieldsForReg/FieldsForReg';
import FieldsForLogin from 'entities/FormLogin/ui/FieldsForLogin/FieldsForLogin';

interface FormLoginProps {
    className?: string
}

const FormLogin: FC<FormLoginProps> = ({className}) => {

    const isRegistration = useSelector(getIsRegistration)

    return (
        <div className={classNames(cls.FormLogin, {}, [className])}>
            {
                isRegistration
                ? <FieldsForReg />
                : <FieldsForLogin />
            }
        </div>
    );
};

export default FormLogin;