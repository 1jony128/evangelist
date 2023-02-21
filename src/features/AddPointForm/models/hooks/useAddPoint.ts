import {useState, useEffect} from "react";
import {useMutation, useQueryClient} from 'react-query';
import {alert} from 'shared/lib/alerts';
import {IAddPoint} from 'features/AddPointForm/models/types';
import {PointServices} from 'entities/Point/models/services/PointServices';
import {useMapStore} from 'entities/Map/models/store/MapStore';
import {getPoints, getSetPoints, getStreetData, selectComment} from 'entities/Map/models/selectors/mapSelectors';
import setPointTransform from 'entities/Map/models/lib/setPointTransform';
import {useAddPointStore} from 'features/AddPointForm/models/store/addPointStore';
import {getFio, getSetClose} from 'features/AddPointForm/models/selectors/addPointSelectors';
import useProfile from 'app/hooks/useProfile';
import {useUserStore} from 'entities/User/models/store/useUserStore';

interface useAddPointProps {
  count: number
}

const useAddPoint = ({count}: useAddPointProps) => {


  const client = useQueryClient()

  const setClose = useAddPointStore(getSetClose);

  const streetData = useMapStore(getStreetData)
  const comment = useMapStore(selectComment);
  const fio = useAddPointStore(getFio);

  const user = useUserStore(state => state.user)

  const {mutate, error, isLoading}  = useMutation('addPoint', PointServices.AddPoint, {
    onSuccess: (newPoint) => {
      alert("Данные успешно добавлены!", "success")
      client.invalidateQueries('allPoints');
      setClose()
    },
    onError: (error: any) => {
      console.log(error)
      // @ts-ignore
      alert(error.message, 'error')
    }
  })

  console.log(streetData)

  const onSubmit = () =>{
    const data: IAddPoint = {
      geo_lat: streetData[0].data.geo_lat,
      geo_lon: streetData[0].data.geo_lon,
      date: "", // лишнее
      count,
      groupId: 1,
      userId: Number(fio!.id),
      comment,
      address: `ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`,
      group_name: "Благовещенск",
      user_name: fio?.value || user?.name || ""
    }
    mutate(data)
  }

  return {onSubmit, error, isLoading};
};

export default useAddPoint;
