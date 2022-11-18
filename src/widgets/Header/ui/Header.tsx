import cls from "./Header.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, useEffect, useState} from 'react';
import {NavBar} from 'antd-mobile';
import {useLocation, useNavigate} from 'react-router-dom';

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({className}) => {

    const [show, setShow] = useState(true)
    const [title, setTitle] = useState("")

    let navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === "/"){
            setShow(false)
        } else {
            if(location.pathname === "/profile"){
                setTitle("Профиль")
            }
            if(location.pathname === "/setting"){
                setTitle("Настройки")
            }
            setShow(true)
        }
    }, [location.pathname])


    const setRouteActive = () => {
        navigate("/")
    }

    if(show){
        return (
            <div className={classNames(cls.Header, {}, [className])}>
                <NavBar onBack={setRouteActive}>{title}</NavBar>
            </div>
        );
    }

    return null

};

export default Header;