import {useState, useEffect} from "react";
import {useMutation} from 'react-query';
import {AuthService} from 'features/AuthByEmail/models/services/auth';
import {alert} from 'shared/lib/alerts';
import {useCardsStore} from 'features/AuthByEmail/models/authStore';


const useAuth = () => {

  const setAuth = useCardsStore(state => state.setAuth)
  const {mutate, error, isLoading}  = useMutation('authByEmail', AuthService.AuthByEmail, {
    onSuccess: (data) => {
      setAuth(true)
      localStorage.setItem('token_user', data.data.token)
      alert('Вы успешно вошли!', 'success')
    },
    onError: (error: any) => {
      // @ts-ignore
      alert(error.message, 'error')
    }
  })

  useEffect(() => {
    if(localStorage.getItem('token_user')){
      setAuth(true)
    }
  }, [])

  return {
    mutate, error, isLoading
  }
};

export default useAuth;
