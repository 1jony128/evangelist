import cls from "./MainLayout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import Map from 'widgets/MainLayout/Map/ui/Map';
import Dialog from 'widgets/MainLayout/Dialog/ui/Dialog';
import useInitMap from 'widgets/MainLayout/Map/models/hooks/useInitMap';

interface MainLayoutProps {
    className?: string
}

const MainLayout: FC<MainLayoutProps> = ({className}) => {
    const {map, objectManager } = useInitMap()


    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
           <Map  map={map} objectManager={objectManager}/>
           <Dialog map={map} objectManager={objectManager}/>
        </div>
    );
};

export default MainLayout;