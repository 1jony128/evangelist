import {$api} from 'app/utils/apiAxios';
import {IAuthByEmail} from 'features/AuthByEmail/models/types';



export const AuthService = {
  async AuthByEmail (data: IAuthByEmail)  {
    return $api.post('auth/login',data)
  },
}
