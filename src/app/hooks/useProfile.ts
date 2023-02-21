import {useState, useEffect} from "react";
import {useQuery} from 'react-query';
import {AutoSelectService} from 'shared/ui/AutoSelect/services/autoSelect';
import {IUser} from 'entities/User/models/types/userTypes';
import {useUserStore} from 'entities/User/models/store/useUserStore';


const useProfile = () => {

  const {setUser} = useUserStore()


  const {isLoading, data, error} = useQuery<IUser>('profile', () => AutoSelectService.getOptions("users/1"), {
    onSuccess:(data) => {
      setUser(data)
    },
  })


};

export default useProfile;
