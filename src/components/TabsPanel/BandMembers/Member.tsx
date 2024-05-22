import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {FC, useEffect, useState} from 'react';
import {Card, CardActions, CardContent, CardMedia} from '@mui/material';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';

interface MemberProps {
  fio: string
  photo: string
  role: string
}

const Member: FC<MemberProps> = ({photo,role,fio}) => {

  const [image, setImage] = useState<string | null>(null)


  useEffect(() => {
    if(photo){
      const storage = getStorage();
      const pathReference = ref(storage, photo);
      console.log(pathReference)
      getDownloadURL(pathReference).then(data => {
        console.log(data)
        setImage(data)
      })
    }
  },[photo])

  console.log(image)

  if(image)
  return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 240 }}
            image={image}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {fio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </CardContent>
        </Card>
  );

  console.log(image)

  return (
    <Card sx={{ maxWidth: 345 }}>
      Загрузка...
    </Card>
  )
}

export default Member
