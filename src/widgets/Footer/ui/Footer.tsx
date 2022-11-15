import cls from "./Footer.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import {TabBar} from 'antd-mobile';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppstoreOutline, SetOutline, UserOutline} from 'antd-mobile-icons';

interface FooterProps {
    className?: string
}

const Footer: FC<FooterProps> = ({className}) => {


    let navigate = useNavigate();

    const location = useLocation()
    const { pathname } = location

    const setRouteActive = (value: string) => {
        navigate(value)
    }

    const tabs = [
        {
            key: '/',
            title: 'карта',
            icon: <AppstoreOutline />,
        },
        {
            key: '/setting',
            title: 'настройки',
            icon: <SetOutline />,
        },
        {
            key: '/profile',
            title: 'профиль',
            icon: <UserOutline />,
        },
    ]

    return (
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    );
};

export default Footer;