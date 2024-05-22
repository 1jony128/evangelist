
import {FC, useEffect, useState} from 'react';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import {IGrammote} from 'types';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import {CircularProgress, Paper} from '@mui/material';
import Box from '@mui/material/Box';

const Grammote: FC<IGrammote> = ({photo, name}) => {

  const [image, setImage] = useState<string | null>(null)


  useEffect(() => {
    if(photo){
      const storage = getStorage();
      const pathReference = ref(storage, photo);
      getDownloadURL(pathReference).then(data => {
        console.log(data)
        setImage(data)
      })
    }
  },[photo])


  if(!image){
    return (
      <Paper>
        <Box sx={{ display: 'flex' }}>
          <img
            src={''}
            srcSet={''}
            placeholder={'загрузка...'}
            alt={name}
            className={'image_place'}
          />
          Загрузка...
          <CircularProgress />
        </Box>
      </Paper>
    )
  }


    return (
      <ImageListItem key={name}>
        <img
          src={`${image}?w=248&fit=crop&auto=format`}
          srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={name}
          loading="lazy"
        />
      </ImageListItem>
    );
};

export default Grammote;
