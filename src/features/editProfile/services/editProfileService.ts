import {$api} from 'app/utils/apiAxios';


export const EditProfileService = {
  async editAvatar ({id, form}: { id: string, form: FormData } )  {
    return $api.patch<string>('users/' + id,form).then(data => data.data)
  },
}
