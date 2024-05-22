import {FC} from "react";
import StandardImageList from 'components/ui/ImageList';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useStore} from 'store/useStore';
import {selectAbout, selectCurrentGroup} from 'store/selectors';

interface AboutProps {

}

const About: FC<AboutProps> = ({}) => {

  const data = useStore(selectAbout)

  if(data){
    return (
      <Stack spacing={2} direction={'column'}>
        <Typography variant={'h4'}>
          {data.title}
        </Typography>
        <Typography variant={'body1'}>
          {data.description}
        </Typography>
      </Stack>
    );
  }

  return null

};

export default About;
