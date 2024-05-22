import {Button, CircularProgress, Paper} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {IPhoto, IPlace} from 'types';
import {PhotoAlbum} from '@mui/icons-material';
import StandardImageList from 'components/ui/ImageList';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import Box from '@mui/material/Box';


const ItemCaurusel: FC<IPhoto> = ({photo, name}) => {
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
        <h2>{name}</h2>
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
    <Paper>
      <h2>{name}</h2>
      <img
        src={`${image}?w=248&fit=crop&auto=format`}
        srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        placeholder={'загрузка...'}
        alt={name}
        className={'image_place'}
      />
    </Paper>
  )
}


export default ItemCaurusel
