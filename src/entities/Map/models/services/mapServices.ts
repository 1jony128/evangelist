import {IAuthByEmail} from 'features/AuthByEmail/models/types';
import axios from 'axios';
import {StreetData} from 'entities/Point/models/types/point';


export const MapServices = {
  async getStreetData (data: number[])  {
    return axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
      {"lat": data[0], "lon": data[1], "radius_meters": 10},{
        headers: {
          Authorization: 'Token 02064c1ca019072ad521dd88b722db1019854ac2',
        }
      })
  }
}
