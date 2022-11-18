import cls from "./SettingPage.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";

import Layout from 'pages/Layout/Layout';

interface SettingPageProps {
    className?: string
}

const SettingPage: FC<SettingPageProps> = ({className}) => {
    return (
        <div className={classNames(cls.SettingPage, {}, [className])}>
            <Layout>

            </Layout>
        </div>
    );
};

export default SettingPage;