import {LoginShema} from 'entities/FormLogin/models/types/loginShema';


export interface Form {
    key: LoginShema['access_key'],
    value: string
}