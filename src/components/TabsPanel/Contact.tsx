import {FC} from "react";
import {useStore} from 'store/useStore';
import {selectContacts, selectPlaces} from 'store/selectors';
import {Paper} from '@mui/material';
import Typography from '@mui/material/Typography';

interface ContactProps {

}

const Contact: FC<ContactProps> = ({}) => {

  const data = useStore(selectContacts)

  console.log(data)

  if(!data){
    return null
  }

    return (
      <Paper elevation={3} className={'contact'}>
        <Typography>
          {data.fio}
        </Typography>
        <a href={"tel:" + data.phone} className={'phone'}>
          {data.phone}
        </a>
      </Paper>
    );
};

export default Contact;
