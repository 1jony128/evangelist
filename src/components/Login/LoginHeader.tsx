import { Typography } from "@mui/material";
import { FC } from "react";
import {ReactComponent as PreloadIcon} from "../../accept/img/preload-icon.svg"
interface LoginHeaderProps {
    
}
 
const LoginHeader: FC<LoginHeaderProps> = () => {
    return ( 
        <>
        <Typography variant="h4" gutterBottom>
            Благовестник
        </Typography>
        <PreloadIcon />
        </>
     );
}
 
export default LoginHeader;