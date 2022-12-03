import {createAsyncThunk} from '@reduxjs/toolkit';
import {IS_LOGIN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY} from 'shared/const/localstorage';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {loginActions} from 'entities/FormLogin/models/slices/LoginSlice';
import {alert, alertText} from 'shared/lib/alerts';

interface RegistrationUserProps {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk<
    string,
    RegistrationUserProps,
    ThunkConfig<string>
>(
    'login/loginUser',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await fetch('http://localhost:5000/api/user/login',{
                method: 'POST',
                body: JSON.stringify(authData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json()

            switch (response.status) {
                case 200:
                    alert(alertText.successReg, "success")
                    localStorage.setItem(IS_LOGIN_LOCALSTORAGE_KEY, "true");
                    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
                    dispatch(loginActions.setToken(data));
                    return data;
                default:
                    alert(data.message, "error")
                    return rejectWithValue(data.message)
            }
        } catch (e) {
            return rejectWithValue(",");
        }
    },
);
