import {$api} from 'app/utils/apiAxios';
import {IAuthByEmail} from 'features/AuthByEmail/models/types';



export const EditProfileService = {
  async editAvatar ({id, form}: { id: string, form: FormData } )  {
    return $api.patch<string>('users/' + id,form).then(data => data.data)
  },
}
