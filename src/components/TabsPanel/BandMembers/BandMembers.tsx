import {FC} from "react";
import List from '@mui/material/List';
import Member from 'components/TabsPanel/BandMembers/Member';
import {useStore} from 'store/useStore';
import {selectAbout, selectBandMembers} from 'store/selectors';

interface BandMembersProps {

}

const BandMembers: FC<BandMembersProps> = ({}) => {

  const data = useStore(selectBandMembers)

    return (
      <List sx={{ width: '100%', minWidth: 300, maxWidth: 800, bgcolor: 'background.paper', margin: "0 auto", gap: "32px", display: "flex", "flex-wrap": "wrap", cursor: "pointer" }}>

        {
          data?.map(item => <Member key={item.fio} {...item} />)
        }
        </List>
    );
};

export default BandMembers;
