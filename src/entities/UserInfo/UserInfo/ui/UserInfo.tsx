import cls from "./UserInfo.module.scss"
import {classNames} from "shared/lib/classNames";
import {FC} from "react";
import Typography from 'antd/lib/typography'
interface UserInfoProps {
    className?: string
}

const UserInfo: FC<UserInfoProps> = ({className}) => {
    return (
        <div className={classNames(cls.UserInfo, {}, [className])}>
           <Typography.Text>
               Роздано газет:
           </Typography.Text>
        </div>
    );
};

export default UserInfo;