import {FC} from "react";
import MainLayout from 'widgets/MainLayout/ui/MainLayout';
import Layout from 'pages/Layout/Layout';

interface MainPageProps {
    className?: string
}

const MainPage: FC<MainPageProps> = ({className}) => {
    return (
        <Layout>
            <MainLayout />
        </Layout>
    );
};

export default MainPage;