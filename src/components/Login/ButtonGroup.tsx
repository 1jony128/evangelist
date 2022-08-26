import { Button } from "@mui/material";
import { FC } from "react";
import { TypeForm } from "./LoginLayout";

interface ButtonGroupProps {
    onLogin: () => void,
    onReg: () => void,
    isLogin: boolean,
    changeForm: () => void
}
 
const ButtonGroup: FC<ButtonGroupProps> = ({onLogin, onReg, isLogin,changeForm }) => {
    return ( 
        <div className="button_group">
            {
                isLogin ? 
                <>
                <Button 
                        variant="contained"
                        onClick={onLogin}  
                        color="success"                   
                >
                    Войти
                </Button>
                <Button 
                    size="small" 
                    className="mt10"
                    onClick={changeForm}
                >
                    Нет аккаунта?
                </Button>
                </>
                :
                <>
                <Button 
                    variant="contained"
                    color="success"
                    onClick={onReg}
                >
                    Зарегистрироваться
                </Button>
                <Button 
                    size="small" 
                    className="mt10"
                    onClick={changeForm}
                >
                    уже есть аккаунт?
                </Button>
                </>
            }
                    
                
            </div>
     );
}
 
export default ButtonGroup;