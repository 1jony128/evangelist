import { Typography } from "@mui/material";
import { FC } from "react";
import LoginHeader from "../components/Login/LoginHeader";

import LoginLayout from "../components/Login/LoginLayout";

interface LoginProps {
    
}
 
const Login: FC<LoginProps> = () => {
    return ( 
        <div className="wrapper">
            <LoginHeader />
            <LoginLayout />
        </div>
     );
}
 
export default Login;