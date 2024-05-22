import {FC} from "react";
import List from '@mui/material/List';
import Review from 'components/TabsPanel/Review';

interface ReviewsProps {

}

const Reviews: FC<ReviewsProps> = ({}) => {
    return (
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', margin: "0 auto" }}>
        <Review />
        <Review />
        <Review />

      </List>
    );
};

export default Reviews;
