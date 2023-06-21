import {FC, useEffect, useRef} from 'react';
import {CircleMarker, Popup} from 'react-leaflet';
import {LatLngExpression} from 'leaflet';
import DialogPoint from '@/pages/MapPage/DialogPoint/ui/DialogPoint';
import {useMapStore} from '@/entities/Map/models/store/MapStore';
import {getSetTouchCoords, getTouchCoords} from '@/entities/Map/models/selectors/mapSelectors';
import {useAddPointStore} from '@/features/AddPointForm/models/store/addPointStore';
import {selectIsOpen} from '@/features/AddPointForm/models/selectors/addPointSelectors';

interface MarkerEvaProps {
    className?: string
}

const MarkerEva: FC<MarkerEvaProps> = ({className}) => {
  const touchCoords = useMapStore(getTouchCoords);
  const greenOptions = { color: 'green', fillColor: 'green' }
  const setTouchCoords = useMapStore(getSetTouchCoords);

  const refMarker = useRef<any>()

  const isOpen = useAddPointStore(selectIsOpen);

  useEffect(() => {
    if(refMarker.current){
      refMarker.current.openPopup()
    }
  },[refMarker.current, touchCoords])

  useEffect(() => {
    if(!isOpen){
      refMarker.current.closePopup()
    }
  },[isOpen])

  const onClose = () => {

  }

    return (
      <CircleMarker pathOptions={greenOptions} center={touchCoords as LatLngExpression} ref={refMarker}>
        <Popup autoClose>
          <DialogPoint />
        </Popup>
      </CircleMarker>
    );
};

export default MarkerEva;
