import { FC } from "react";
import { VStack } from "shared/ui/Stack";
import { AuthByEmail } from "features/AuthByEmail";
import cls from "./AuthPage.module.scss";
import { useSignStore } from "features/SignInByEmail/model/store/signStore";
import {
  selectSetShowSign,
  selectShowSign,
} from "features/SignInByEmail/model/selector";
import { SignInByEmail } from "features/SignInByEmail";
interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = ({}) => {
  const showSign = useSignStore(selectShowSign);

  return (
    <VStack max className={cls.AuthPage} align={"center"} justify={"center"}>
      {showSign ? <SignInByEmail /> : <AuthByEmail />}
    </VStack>
  );
};

export default AuthPage;
