import {useState, useEffect} from "react";
import {IS_LOGIN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY} from 'shared/const/localstorage';
import {useSelector} from 'react-redux';
import {getIsRegistration} from 'entities/FormLogin/models/selectors/login';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {loginActions} from 'entities/FormLogin/models/slices/LoginSlice';


const useAuth = () => {

    const isRegistration = useSelector(getIsRegistration)

    const dispatch = useAppDispatch()


    useEffect(() => {
        if(localStorage.getItem(IS_LOGIN_LOCALSTORAGE_KEY) && isRegistration){
            dispatch(loginActions.changeIsRegistration(false))
        }
        if(localStorage.getItem(USER_LOCALSTORAGE_KEY)){
            dispatch(loginActions.loginSuccess())
        }
    },[isRegistration])

};

export default useAuth;
