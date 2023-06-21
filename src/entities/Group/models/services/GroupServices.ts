import {$api} from '@/app/utils/apiAxios';
import {signGroupDto, User} from '@/entities/Group/models/types';


export const GroupServices = {
  // async AddPoint (data: IAddPoint)  {
  //   return $api.post('eva-event/',data)
  // },
  // async UpdatePoint (data: IUpdatePoint)  {
  //   return $api.patch('eva-event/' + data.id,data.data)
  // },
  async AllGroups (idUser?: number)  {
    return $api.get('group/' + idUser +'/get-groups/')
  },
  async AllGroupUsers (idGroup?: number)  { // пользователи группы
    return $api.get<User[]>('group/' + idGroup +'/get-users/')
  },
  async signGroup (data: signGroupDto)  {
    return $api.post<signGroupDto>('group/sign-group/', data)
  },
  // async AllPointsById (userId: string)  {
  //   return $api.post<Data[]>('eva-event/get-by-id/',{
  //     userId
  //   }).then(data => data.data)
  // },
}
