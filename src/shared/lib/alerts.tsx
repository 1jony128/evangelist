/* eslint-disable jsx-a11y/alt-text */
import { toast } from 'react-toastify';


type toastType = "success" | "error" | "info"

export enum alertText {
    serverError = "Ошибка сервера!",
    passwordDontMatch = "Пароли не совпадают!",
    nameEmpty = "Заполните поле: имя!",
    loginEmpty = "Заполните поле: логин!",
    accessKeyEmpty = "Заполните поле: ключ доступа!",
    passwordEmpty = "Заполните поле: пароль!",
    repeatPasswordEmpty = "Заполните поле: повторите пароль!",
    successReg = "Успешная регистрация!",
    successLogin = "Успешная авторизация!"
}


export const alert = (text: alertText | string, type: toastType ) => {
    const value = text ? text : alertText.serverError
    toast[type](value, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
