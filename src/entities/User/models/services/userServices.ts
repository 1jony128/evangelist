import {$api} from 'app/utils/apiAxios';
import {IAuthByEmail} from 'features/AuthByEmail/models/types';



export const UserService = {
  async GetUser (id: string)  {
    return $api.get('user/' + id)
  },
}
