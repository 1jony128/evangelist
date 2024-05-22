import {FC, useEffect, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import BasicRating from 'components/TabsPanel/Reviews/Rating';
import {IReview} from 'types';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import {Stack} from '@mui/material';

interface ReviewProps {
  avatar: string
  comment: string
  name: string
}

const Review: FC<ReviewProps> = ({comment, avatar, name}) => {

    return (
      <Stack>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={name} src={avatar}/>
          </ListItemAvatar>
          <Stack>
            <ListItemText
              secondary={name}
            />
            <ListItemText
              primary={comment}
            />
          </Stack>

        </ListItem>
        <Divider variant="inset" component="li" />
      </Stack>
    );
};

export default Review;
