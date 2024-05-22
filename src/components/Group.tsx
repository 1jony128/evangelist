import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from 'components/TabPanel';
import {selectTab} from 'helpers/selectTab';
import About from 'components/TabsPanel/About/About';
import BandMembers from 'components/TabsPanel/BandMembers/BandMembers';
import Reviews from 'components/TabsPanel/Reviews/Reviews';
import Contact from 'components/TabsPanel/Contact';
import Grammotes from 'components/TabsPanel/Grammotes/Grammotes';
import Places from 'components/TabsPanel/Place/Places';







function Group() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      name: "Общее",
      "value": 0
    },
    {
      name: "Участники группы",
      "value": 1
    },
    {
      name: "Посещенные места",
      "value": 2
    },
    {
      name: "Благодарности",
      "value": 3
    },
    {
      name: "Отзывы",
      "value": 4
    },
    {
      name: "Контакты",
      "value": 5
    },
  ]

  const tabsPanel = [
    {
      node: <About />,
      "value": 0
    },
    {
      node: <BandMembers />,
      "value": 1
    },
    {
      node: <Places />,
      "value": 2
    },
    {
      node: <Grammotes />,
      "value": 3
    },
    {
      node: <Reviews />,
      "value": 4
    },
    {
      node: <Contact />,
      "value": 5
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            tabs.map(item =>
              <Tab
                className={'tab_item'}
                label={item.name}
                {...selectTab(item.value)}
              />
            )
          }
        </Tabs>
      </Box>
      {
        tabsPanel.map(item => (
          <TabPanel value={value} index={item.value}>
            {item.node}
          </TabPanel>
        ))
      }
    </Box>
  );
}

export default Group
