import { useMutation, useQueryClient } from "react-query";
import { alert } from "shared/lib/alerts";
import { IAddPoint } from "features/AddPointForm/models/types";
import { PointServices } from "entities/Point/models/services/PointServices";
import { useMapStore } from "entities/Map/models/store/MapStore";
import { getStreetData } from "entities/Map/models/selectors/mapSelectors";
import { useAddPointStore } from "features/AddPointForm/models/store/addPointStore";
import {
  selectAddress,
  selectClearForm,
  selectComment,
  selectCount,
  selectFio,
  selectMode,
  selectPoint,
  selectSetClose,
} from "features/AddPointForm/models/selectors/addPointSelectors";
import { useUserStore } from "entities/User/models/store/useUserStore";
import {useGroupsStore} from 'entities/Group/models/store/useGroupStore';
import {selectCurrentGroup} from 'entities/Group/models/selectors';

const useAddPoint = () => {
  const client = useQueryClient();



  const streetData = useMapStore(getStreetData);

  const setClose = useAddPointStore(selectSetClose);
  const comment = useAddPointStore(selectComment);
  const fio = useAddPointStore(selectFio);
  const count = useAddPointStore(selectCount);
  const address = useAddPointStore(selectAddress);
  const point = useAddPointStore(selectPoint);
  const mode = useAddPointStore(selectMode);
  const clearForm = useAddPointStore(selectClearForm);

  const user = useUserStore((state) => state.user);



  const currentGroup = useGroupsStore(selectCurrentGroup)

  const { mutate, error, isLoading } = useMutation(
    "addPoint",
    PointServices.AddPoint,
    {
      onSuccess: (newPoint) => {
        alert("Данные успешно добавлены!", "success");
        client.invalidateQueries("allPoints");
        setClose();
        clearForm();
      },
      onError: (error: any) => {
        // @ts-ignore
        alert(error.response.data.message, "error");
      },
    }
  );

  const {
    mutate: mutateUpdate,
    error: errorUpdate,
    isLoading: isLoadingUpdate,
  } = useMutation("updatePoint", PointServices.UpdatePoint, {
    onSuccess: (newPoint) => {
      alert("Данные успешно отредактированы!", "success");
      client.invalidateQueries("allPoints");
      setClose();
      clearForm();
    },
    onError: (error: any) => {
      // @ts-ignore
      alert(error.response.data.message, "error");
    },
  });

  const validation = () => {
    if (address === "Благовещенск" && mode === "create") {
      alert("Введите корректный адрес", "error");
      return true;
    }
    if (comment.length === 0) {
      alert("Введите комментарий", "error");
      return true;
    }

    return false;
  };

  const onSubmit = () => {
    if (validation()) return;
    const data: IAddPoint = {
      date: "", // лишнее
      count,
      groupId: currentGroup!.id,
      group_name: currentGroup!.name,
      userId: Number(fio!.id),
      user_name: fio?.value || user?.name || "",
      comment,
    };
    if (mode === "create") {
      if (typeof address !== "string" && address !== undefined) {
        data.geo_lat = `${address.data.geo_lat}`;
        data.geo_lon = `${address.data.geo_lon}`;
        data.address = `ул. ${address.data?.street}, д. ${address.data?.house}`;
      } else {
        data.geo_lat = streetData[0].data.geo_lat;
        data.geo_lon = streetData[0].data.geo_lon;
        data.address = `ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`;
      }
    } else {
      if (typeof address !== "string" && address !== undefined) {
        data.geo_lat = `${address.data.geo_lat}`;
        data.geo_lon = `${address.data.geo_lon}`;
        data.address = `ул. ${address.data?.street}, д. ${address.data?.house}`;
      } else if (point) {
        data.geo_lat = point.geo_lat;
        data.geo_lon = point.geo_lon;
        data.address = point.address;
      }
    }

    if (mode === "create") {
      mutate(data);
      return;
    }

    mutateUpdate({
      id: point!.id,
      data,
    });
  };

  return { onSubmit, error, isLoading };
};

export default useAddPoint;

// const onSubmit = () =>{
//   // if(mode === "create"){
//   console.log('0')
//   if(address && (typeof address !== "string") && address.data && !streetData){
//     console.log('1')
//     const data: IAddPoint = {
//       geo_lat: `${address.data.geo_lat}`,
//       geo_lon: `${address.data.geo_lon}`,
//       date: "", // лишнее
//       count,
//       groupId: 1,
//       userId: Number(fio!.id),
//       comment,
//       address: `ул. ${address.data?.street}, д. ${address.data?.house}`,
//       group_name: "Благовещенск",
//       user_name: fio?.value || user?.name || ""
//     }
//     mutate(data)
//   } else if(streetData && streetData.length > 0){
//     console.log('2')
//     const data: IAddPoint = {
//       geo_lat: streetData[0].data.geo_lat,
//       geo_lon: streetData[0].data.geo_lon,
//       date: "", // лишнее
//       count,
//       groupId: 1,
//       userId: Number(fio!.id),
//       comment,
//       address: `ул. ${streetData[0]?.data?.street}, д. ${streetData[0]?.data?.house}`,
//       group_name: "Благовещенск",
//       user_name: fio?.value || user?.name || ""
//     }
//     mutate(data)
//   } else if(touchCoords && address && (typeof address !== "string")){
//     console.log('3')
//     const data: IAddPoint = {
//       geo_lat: `${address.data.geo_lat}`,
//       geo_lon: `${address.data.geo_lon}`,
//       date: "", // лишнее
//       count,
//       groupId: 1,
//       userId: Number(fio!.id),
//       comment,
//       address: `ул. ${address?.data?.street}, д. ${address?.data?.house}`,
//       group_name: "Благовещенск",
//       user_name: fio?.value || user?.name || ""
//     }
//     mutate(data)
//   }
//   // }
//   // else {
//   //
//   // }
//
//
// }
