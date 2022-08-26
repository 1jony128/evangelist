import { TextField } from "@mui/material";
import { FC } from "react";
import useInput, { IInput } from "../../hooks/useInput";

interface InputGroupProps {
    name: IInput, 
    password: IInput, 
    key_access: IInput,
    isLogin: boolean,
    fullName: IInput
    passwordRepeat: IInput
}
 
const InputGroup: FC<InputGroupProps> = ({name, password, passwordRepeat, key_access, isLogin, fullName}) => {

if(isLogin){
    return ( 
        <div className="input_group">
            <div className="row">
                <TextField 
                    label="логин" 
                    variant="outlined" 
                    placeholder='Введите логин'
                    value={name.value}
                    error={name.error}
                    onChange={name.onChange}
                />
            </div>
            <div className="row">
                <TextField 
                    error={password.error}
                    label="пароль" 
                    variant="outlined" 
                    placeholder='Введите пароль'
                    value={password.value}
                    onChange={password.onChange}
                    type="password"
                />
            </div>
        </div>
    );
}

return (
    <div className="input_group">
            <div className="row">
                <TextField 
                    error={name.error}
                    label="логин" 
                    variant="outlined" 
                    placeholder='Введите логин'
                    value={name.value}
                    onChange={name.onChange}
                />
            </div>
            <div className="row">
                <TextField 
                    error={fullName.error}
                    label="полное имя" 
                    variant="outlined" 
                    placeholder='Введите имя'
                    value={fullName.value}
                    onChange={fullName.onChange}
                />
            </div>
            <div className="row">
                <TextField 
                    error={password.error}
                    label="пароль" 
                    variant="outlined" 
                    placeholder='Введите пароль'
                    value={password.value}
                    onChange={password.onChange}
                    type="password"
                />
            </div>
            <div className="row">
                <TextField 
                error={passwordRepeat.error}
                    label="повторите пароль" 
                    variant="outlined" 
                    placeholder='Повторите пароль'
                    value={passwordRepeat.value}
                    onChange={passwordRepeat.onChange}
                    type="password"
                />
            </div>
            <div className="row">
                <TextField 
                    error={key_access.error}
                    label="ключ доступа" 
                    variant="outlined" 
                    placeholder='Введите ключ доступа'
                    value={key_access.value}
                    onChange={key_access.onChange}
                />
            </div>
        </div>
)
        
}
 
export default InputGroup;