import cls from "./MainPage.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";

interface MainPageProps {
    className?: string
}

const MainPage: FC<MainPageProps> = ({className}) => {
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
                map
        </div>
    );
};

export default MainPage;