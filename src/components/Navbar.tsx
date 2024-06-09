import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import BasicMenu from 'components/MenuGroup';
import {useStore} from 'store/useStore';
import {selectName} from 'store/selectors';

export default function Navbar() {

  const name = useStore(selectName)

  return (
    <Box sx={{ backgroundColor: "#E7EBF0", flexGrow: 1 }}>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              ЦДП Содействие
          </Typography>
          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography variant="body1" component="div" sx={{flexGrow: 1}}>
              {name}
            </Typography>
            <BasicMenu />
          </Stack>

        </Toolbar>
    </Box>
  );
}
