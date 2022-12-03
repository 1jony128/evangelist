

export  interface LoginShema {
    login: string,
    name: string,
    password: string,
    repeat_password: string,
    access_key: string,
    isRegistration: boolean
    auth: boolean
    token: string | null
    error: string | undefined
    loading: boolean
}
