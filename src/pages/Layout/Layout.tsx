import cls from "./Layout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, ReactNode} from 'react';
import Header from 'widgets/Header/ui/Header';
import MainLayout from 'widgets/MainLayout/ui/MainLayout';
import {Footer} from 'widgets/Footer';

interface LayoutProps {
    className?: string
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({className, children}) => {
    return (
        <div className={classNames(cls.Layout, {}, [className])}>
            <Header />
                {children}
            <Footer />
        </div>
    );
};

export default Layout;