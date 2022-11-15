import cls from "./ProfileLayout.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import FormProfile from 'entities/FormProfile/ui/FormProfile';
import Logout from 'features/Logout/ui/Logout';

interface ProfileLayoutProps {
    className?: string
}

const ProfileLayout: FC<ProfileLayoutProps> = ({className}) => {
    return (
        <div className={classNames(cls.ProfileLayout, {}, [className])}>
           <FormProfile />
            <Logout />
        </div>
    );
};

export default ProfileLayout;