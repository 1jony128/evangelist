import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useStore} from 'store/useStore';
import {selectPlaces} from 'store/selectors';
import {useFilter} from 'components/TabsPanel/Place/useFilter';

const Filter = () => {

  const data = useStore(selectPlaces)

  const filter = useFilter(state => state.filter)
  const setFilter = useFilter(state => state.setFilter)

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };



  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Фильтр по городам</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Фильтр по городам"
          onChange={handleChange}
        >
          <MenuItem value={"all"}>Все фото</MenuItem>
          {
            data && data.map(item =>
              <MenuItem value={item.name}>{item.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filter
