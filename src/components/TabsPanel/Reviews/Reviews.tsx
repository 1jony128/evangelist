import {FC} from "react";
import List from '@mui/material/List';
import Review from 'components/TabsPanel/Reviews/Review';
import {useStore} from 'store/useStore';
import {selectReviews} from 'store/selectors';
import Stack from '@mui/material/Stack';
import {Paper} from '@mui/material';

interface ReviewsProps {

}

const Reviews: FC<ReviewsProps> = ({}) => {

  const data = useStore(selectReviews)

    return (
      <Stack style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', margin: "0 auto" }}>
          {
            data && data.map(review => <Review {...review} />)
          }
      </List>
      </Stack>
    );
};

export default Reviews;
