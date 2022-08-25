import { Button, TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { alert, alertText } from "../../helpers/alertText";
import useInput from "../../hooks/useInput";
import InputGroup from "./InputGroup";

interface LoginLayoutProps {
    setAuth: Dispatch<SetStateAction<any>>
}
 
const LoginLayout: FC<LoginLayoutProps> = ({setAuth}) => {
    
    const name = useInput("");
    const password = useInput("");
    const key_access = useInput("");

    const onLogin = () => {
        setAuth(true)
        alert(alertText.login, "success")
    }

    const onReg = () => {

    }

    return ( 
        <div className="form">
            <InputGroup 
                key_access={key_access}
                name={name}
                password={password}
            />
            <div className="button_group">
                <div className="row">
                    <Button 
                        variant="contained"
                        className='pr10'
                        onClick={onLogin}                     
                    >
                        Войти
                    </Button>
                </div>
                
                <Button 
                    variant="contained"
                    color="success"
                    onClick={onReg}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </div>
     );
}
 
export default LoginLayout;