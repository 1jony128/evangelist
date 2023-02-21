import {FC} from "react";
import {VStack} from 'shared/ui/Stack';
import {AuthByEmail} from 'features/AuthByEmail';
import cls from './AuthPage.module.scss'
interface AuthPageProps {

}

const AuthPage: FC<AuthPageProps> = ({}) => {
    return (
        <VStack max className={cls.AuthPage} align={'center'} justify={'center'}>
           <AuthByEmail />
        </VStack>
    );
};

export default AuthPage;
