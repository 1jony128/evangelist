import cls from "./Header.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import Title from 'antd/lib/typography/Title';

interface HeaderProps {
    className?: string
    title: string
}

const Header: FC<HeaderProps> = ({className, title}) => {
    return (
        <div className={classNames(cls.Header, {}, [className])}>
            <div className={cls.logo}>
                <Title
                    level={4}
                >
                    Веришь ли ты?
                </Title>
            </div>

            <Title
                level={3}
                className={cls.title}
            >
                {title}
            </Title>
        </div>
    );
};

export default Header;