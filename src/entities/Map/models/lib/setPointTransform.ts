import {FC} from "react";
import {IGetPoint, IPoint} from 'entities/Point/models/types/point';


const setPointTransform = (item: IGetPoint): IPoint => {

  return {
    type: "Feature",
    id: String(item.id),
    geometry: {
      type: "Point",
      coordinates: [+item.geo_lat, +item.geo_lon]
    } ,
    options: {
      preset: 'islands#blueCircleDotIconWithCaption'
    }
  }
};

export default setPointTransform;
