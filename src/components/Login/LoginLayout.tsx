import { Button, Chip, TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { alert, alertText } from "../../helpers/alertText";
import useInput, { IInput } from "../../hooks/useInput";
import ButtonGroup from "./ButtonGroup";
import InputGroup from "./InputGroup";

interface LoginLayoutProps {
    setAuth: Dispatch<SetStateAction<any>>
}

export type TypeForm = "login" | "reg"
 
const LoginLayout: FC<LoginLayoutProps> = ({setAuth}) => {
    
    const name = useInput("", "логин");
    const fullName = useInput("", "имя фамилия");
    const password = useInput("", "пароль");
    const passwordRepeat = useInput("", "повтор пароля");
    const key_access = useInput("", "ключ доступа");
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const validation = (arr: IInput[]) => {
        let errors = 0

        arr.forEach((input: IInput) => {
            if(!input.value.length){
                input.setError(true)
                ++errors
                alert("Введите " + input.placeholder, "error")
            }
        })
        if(errors){
            return false
        } else {
            return true
        }
    }

    const validPasswordCompare = () => {
        const v1 = (password.value === "12345")
        const v2 = (password.value === "123456")
        const v3 = (password.value === "1234567")
        const v4 = (password.value === "12345678")
        const v5 = (password.value === "123456789")
        const v6 = (password.value === "123qwe")
        const v7 = (password.value === "1234qwer")
        if(password.value !== passwordRepeat.value){
            alert("Пароли не совпадают", "error")
            return false
        } else if(password.value.length < 5) {
            alert("Введите более 5 символов", "error")
            return true
        } else if( v1 || v2 || v3 || v4 || v5 || v6 || v7) {
            alert("Не вводите простые команды типа '12345'", "error")
            return true
        } else {
            return true
        }
    }

    const onLogin = () => {
        const arr = [name, password]
        if(!validation(arr)) return
        setAuth(true)
        alert(alertText.login, "success")
    }

    const onReg = () => {
        const arr = [name, fullName, password, passwordRepeat, key_access]
        if(!validation(arr)) return
        if(!validPasswordCompare()) return
        setIsLogin(!isLogin)
        alert(alertText.reg, "success")
    }

    const changeForm = () => {
        setIsLogin(!isLogin)
    }

    return ( 
        <div className="form">
            <InputGroup 
                key_access={key_access}
                name={name}
                password={password}
                isLogin={isLogin}
                fullName={fullName}
                passwordRepeat={passwordRepeat}
            />
            <ButtonGroup 
                onLogin={onLogin}
                onReg={onReg}
                changeForm={changeForm}
                isLogin={isLogin}
            />
        </div>
     );
}
 
export default LoginLayout;