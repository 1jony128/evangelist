import {FC} from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
    return (
        <Stack
          flexDirection={'column'}
          sx={{backgroundColor: "black", height: 100, color: "white", padding: '10px'}}
          alignItems={'center'}
          justifyContent={'center'}
          gap={1}
        >
          
          <Typography>
          ОГРН 1112300001692
          </Typography>
          <Typography>
          Менеджер Михаил <a href="tel:+79002515333" className={'phone'}>+7 900 251-53-33</a>
          </Typography>
          <Typography>ККОО ЦДП "СОДЕЙСТВИЕ"
          г. Краснодар, ул. Красных Партизан, 105</Typography>
        </Stack>
    );
};

export default Footer;
