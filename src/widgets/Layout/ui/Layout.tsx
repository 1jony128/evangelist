import cls from "./Layout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {VStack} from 'shared/ui/Stack';
import Navbar from 'widgets/Navbar/ui/Navbar';

interface LayoutProps {
    className?: string
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({className, children}) => {
    return (
        <VStack className={classNames(cls.Layout, {}, [className])} align={'center'} justify={'between'}>
          <VStack max justify={'center'} align={'center'} className={cls.content}>
            {children}
          </VStack>

            <Navbar />
        </VStack>
    );
};

export default Layout;
