import {IAuthByEmail} from 'features/AuthByEmail/models/types';
import {$api} from 'app/utils/apiAxios';

export const AutoSelectService = {
  async getOptions (link: string)  {
    return $api.get(link).then(data => data.data)
  }
}
