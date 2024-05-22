import {FC} from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface FooterProps {

}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <Stack
          flexDirection={'row'}
          sx={{backgroundColor: "black", height: 60, color: "white"}}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography>
            Футер сайта
          </Typography>
        </Stack>
    );
};

export default Footer;
