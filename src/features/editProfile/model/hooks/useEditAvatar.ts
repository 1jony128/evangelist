import {useState, useEffect} from "react";
import {EditProfileService} from 'features/editProfile/services/editProfileService';
import {useMutation, useQueryClient} from 'react-query';
import {PointServices} from 'entities/Point/models/services/PointServices';
import {alert} from 'shared/lib/alerts';
import {useProfileStore} from 'features/editProfile/model/store/useProfileStore';
import {selectSetShow} from 'features/editProfile/model/selectors';



const useEditAvatar = () => {
  const client = useQueryClient()

  const setShow = useProfileStore(selectSetShow);

  const {mutate, error, isLoading} = useMutation('useEditAvatar', EditProfileService.editAvatar, {
    onSuccess: (newPoint) => {
      alert("Аватар изменен!", "success")
      client.invalidateQueries('profile');
      setShow(false)
    },
    onError: (error: any) => {
      console.log(error)
      // @ts-ignore
      alert(error.message, 'error')
    }
  }
  )
  return {mutate, error, isLoading}
};

export default useEditAvatar;
