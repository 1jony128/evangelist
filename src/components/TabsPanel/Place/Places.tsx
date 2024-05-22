import {FC} from "react";
import Caurusel from 'components/TabsPanel/Place/Caurusel';
import Filter from 'components/TabsPanel/Place/Filter';
import {useStore} from 'store/useStore';
import {selectPlaces, selectReviews} from 'store/selectors';

interface PlacesVisitedProps {

}

const Places: FC<PlacesVisitedProps> = ({}) => {

  const data = useStore(selectPlaces)

  console.log(data)


    return (
        <div>
          <Filter />
          <Caurusel />
        </div>
    );
};

export default Places;
