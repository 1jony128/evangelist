import {FC} from "react";
import List from '@mui/material/List';
import Member from 'components/TabsPanel/Member';

interface BandMembersProps {

}

const BandMembers: FC<BandMembersProps> = ({}) => {
    return (
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', margin: "0 auto" }}>
           <Member />
          <Member />
          <Member />
          <Member />
        </List>
    );
};

export default BandMembers;
