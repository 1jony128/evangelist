import {FC} from "react";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ReviewProps {

}

const Review: FC<ReviewProps> = ({}) => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend? Brunch this weekend? Brunch this weekend? Brunch this weekend? Brunch this weekend?"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
};

export default Review;
