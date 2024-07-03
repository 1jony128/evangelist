import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {FC} from 'react';
import {useStore} from 'store/useStore';
import {selectGrammotes, selectPlaces} from 'store/selectors';
import Grammote from 'components/ui/Grammote';

interface ITitlebarImageList {
  width?: number
  height?: number
}

const TitlebarImageList: FC<ITitlebarImageList> = ({width, height}) => {

  const data = useStore(selectGrammotes)

  return (
    <ImageList sx={{ width: '100%', height: '100%' }}>
      {/*@ts-ignore*/}
      {data && data.map((item) => (
        <Grammote {...item}/>
      ))}
    </ImageList>
  );
}

export default TitlebarImageList


