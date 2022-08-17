import { TextField } from "@mui/material";
import { FC } from "react";
import useInput, { IInput } from "../../hooks/useInput";

interface InputGroupProps {
    name: IInput, 
    password: IInput, 
    key_access: IInput
}
 
const InputGroup: FC<InputGroupProps> = ({name, password, key_access}) => {

    return ( 
            <div className="input_group">
                <div className="row">
                    <TextField 
                        label="имя" 
                        variant="outlined" 
                        placeholder='Введите имя'
                        value={name.value}
                        onChange={name.onChange}
                    />
                </div>
                <div className="row">
                    <TextField 
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
                        label="ключ доступа" 
                        variant="outlined" 
                        placeholder='Введите ключ доступа'
                        value={key_access.value}
                        onChange={key_access.onChange}
                    />
                </div>
            </div>
     );
}
 
export default InputGroup;