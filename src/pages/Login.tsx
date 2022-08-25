import { Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import LoginHeader from "../components/Login/LoginHeader";

import LoginLayout from "../components/Login/LoginLayout";

interface LoginProps {
    setAuth: Dispatch<SetStateAction<any>>
}
 
const Login: FC<LoginProps> = ({setAuth}) => {
    return ( 
        <div className="wrapper">
            <LoginHeader />
            <LoginLayout setAuth={setAuth}/>
        </div>
     );
}
 
export default Login;