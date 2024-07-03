import {FC} from "react";
import StandardImageList from 'components/ui/ImageList';
import Stack from '@mui/material/Stack';

interface GrammotesProps {

}

const Grammotes: FC<GrammotesProps> = ({}) => {
    return (
        <Stack alignItems={'center'}  sx={{padding: '10px'}}>
          <StandardImageList />
        </Stack>
    );
};

export default Grammotes;
