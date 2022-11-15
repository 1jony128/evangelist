import cls from "./MainLayout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";

interface MainLayoutProps {
    className?: string
}

const MainLayout: FC<MainLayoutProps> = ({className}) => {
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
           
        </div>
    );
};

export default MainLayout;