import cls from "./ProfileLayout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import FormProfile from 'entities/FormProfile/ui/FormProfile';
import Logout from 'features/Logout/ui/Logout';
import {UserInfo} from 'entities/UserInfo';

interface ProfileLayoutProps {
    className?: string
}

const ProfileLayout: FC<ProfileLayoutProps> = ({className}) => {
    return (
        <div className={classNames(cls.ProfileLayout, {}, [className])}>
            <UserInfo />
            <FormProfile />
            <Logout />
        </div>
    );
};

export default ProfileLayout;