import { useEffect } from "react";
import { useMapStore } from "@/entities/Map/models/store/MapStore";
import { useMutation, useQuery } from "react-query";
import { alert } from "@/shared/lib/alerts";
import { MapServices } from "@/entities/Map/models/services/mapServices";
import {
  getPoints,
  getSetPoints,
  getSetSelectPoint,
  getSetStreetData,
  getStreetData,
  getTouchCoords,
} from "@/entities/Map/models/selectors/mapSelectors";
import { PointServices } from "@/entities/Point/models/services/PointServices";

interface usePointProps {}

const usePoint = ({}: usePointProps) => {
  const points = useMapStore(getPoints);
  const touchCoords = useMapStore(getTouchCoords);
  const setSelectPoint = useMapStore(getSetSelectPoint);
  const setStreetData = useMapStore(getSetStreetData);
  const streetData = useMapStore(getStreetData);
  const setPoints = useMapStore(getSetPoints);

  const allPoints = useQuery("allPoints", () => PointServices.AllPoints(), {
    onSuccess: ({ data }) => {
      setPoints(data);
    },
  });

  const { mutate, error, isLoading } = useMutation(
    "authByEmail2",
    MapServices.getStreetData,
    {
      onSuccess: (data) => {
        if (data.data.suggestions.length > 1) {
          setStreetData(data.data);
        }
      },
      onError: (error: any) => {
        alert(error.message, "error");
      },
    }
  );

  useEffect(() => {
    if (touchCoords) {
      // @ts-ignore
      setStreetData([]);
      mutate(touchCoords);
    }
  }, [touchCoords]);
};

export default usePoint;
