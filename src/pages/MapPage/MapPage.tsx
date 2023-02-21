import {FC, useMemo} from 'react';
import Layout from 'widgets/Layout/ui/Layout';
import useInitMap from 'entities/Map/models/hooks/useInitMap';
import Map from 'entities/Map/ui/Map';
import MyDrawer from 'shared/ui/MyDrawer/MyDrawer';
import {useMapStore} from 'entities/Map/models/store/MapStore';
import {getStreetData, getTouchCoords} from 'entities/Map/models/selectors/mapSelectors';
import DialogPoint from 'pages/MapPage/DialogPoint/ui/DialogPoint';
import {AddPointForm} from 'features/AddPointForm';
import {useQuery} from 'react-query';

interface MapPageProps {

}

const MapPage: FC<MapPageProps> = ({}) => {

  const {map, objectManager} = useInitMap()


  return (
    <Layout>
      <Map map={map} objectManager={objectManager} />
      <DialogPoint map={map} objectManager={objectManager} />
      <AddPointForm  map={map} objectManager={objectManager} />
    </Layout>
  );
};

export default MapPage;
