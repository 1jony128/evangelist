import cls from "./ProfilePage.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import Layout from 'pages/Layout/Layout';
import ProfileLayout from 'widgets/ProfileLayout/ui/ProfileLayout';

interface ProfilePageProps {
    className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({className}) => {
    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
           <Layout>
                <ProfileLayout />
           </Layout>
        </div>
    );
};

export default ProfilePage;