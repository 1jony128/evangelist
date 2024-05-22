import {FC} from "react";
import StandardImageList from 'components/ui/ImageList';
import Stack from '@mui/material/Stack';

interface GrammotesProps {

}

const Grammotes: FC<GrammotesProps> = ({}) => {
    return (
        <Stack alignItems={'center'} >
          <StandardImageList width={1000} height={1000}/>
        </Stack>
    );
};

export default Grammotes;
