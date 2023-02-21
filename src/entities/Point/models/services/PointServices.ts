import {$api} from 'app/utils/apiAxios';
import {IAddPoint} from 'features/AddPointForm/models/types';
import { Data } from 'pages/ProfilePage/models/hooks/useCountPoints';

export const PointServices = {
  async AddPoint (data: IAddPoint)  {
    return $api.post('eva-event/',data)
  },
  async AllPoints ()  {
    return $api.get('eva-event/')
  },
  async AllPointsById (userId: string)  {
    return $api.post<Data[]>('eva-event/get-by-id/',{
      userId
    }).then(data => data.data)
  },
}
