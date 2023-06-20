import {FC} from 'react';
import Layout from 'widgets/Layout/ui/Layout';
import Map from 'entities/Map/ui/Map';
import {AddPointForm} from 'features/AddPointForm';

interface MapPageProps {

}

const MapPage: FC<MapPageProps> = ({}) => {




  return (
    <Layout>
      <Map />
      <AddPointForm />
    </Layout>
  );
};

export default MapPage;
