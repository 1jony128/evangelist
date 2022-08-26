import { toast } from "react-toastify";

export const alert = (text: alertText | string, type: toastType ) => {
    new Promise<void>((res) => {
        const value = text
        toast[type](value, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        res();
    })
}

export enum alertText {
    login = "Успешная авторизация",
    reg = "Успешная регистрация, теперь авторизируйтесь",
    logout = "Вы вышли из системы",
    emptyField = "Заполните все поля!",
    addPoint = "Метка успешно создана!",
    editPoint = "Метка успешно изменена!",
    removePoint = "Метка успешно удалена!"
}

type toastType = "success" | "error" | "info"