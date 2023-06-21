import cls from "./AuthByEmail.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { FC, useState } from "react";
import { HStack, VStack } from "@/shared/ui/Stack";
import useInput from "@/shared/hooks/useInput";
import { alert } from "@/shared/lib/alerts";
import { Button, Heading, Input, Text } from "@chakra-ui/react";
import Loader from "@/shared/ui/Loader/Loader";
import useAuth from "@/features/AuthByEmail/models/hook/useAuth";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useSignStore} from '@/features/SignInByEmail/model/store/signStore';
import {selectSetShowSign} from '@/features/SignInByEmail/model/selector';
interface AuthByEmailProps {
  className?: string;
}

const AuthByEmail: FC<AuthByEmailProps> = ({ className }) => {
  const email = useInput("");
  const password = useInput("");
  const [showPassword, setshowPassword] = useState(false);

  const setShowSign = useSignStore(selectSetShowSign);

  const { mutate, error, isLoading } = useAuth();

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const validation = () => {
    let error = 0;
    if (email.value === "") {
      alert("Заполните email", "error");
      email.setError(true);
      error++;
    }
    if (password.value === "") {
      alert("Заполните пароль", "error");
      password.setError(true);
      error++;
    }
    return !!error;

  };

  const onSubmit = async () => {
    if (validation()) return;

    const data = {
      email: email.value,
      password: password.value,
    };
    mutate(data);
  };

  return (
    <VStack className={classNames(cls.AuthByEmail, {}, [className])} gap={"16"}>
      <Heading>Авторизация</Heading>
      <HStack max align={"center"} justify={"between"} gap={"16"}>
        <Text>email:</Text>
        <Input
          placeholder="email"
          value={email.value}
          onChange={email.onChange}
        />
      </HStack>
      <HStack max align={"center"} justify={"between"} gap={"16"}>
        <Text>пароль:</Text>
        <Input
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password.value}
          onChange={password.onChange}
        />
        {!showPassword ? (
          <RemoveRedEyeIcon onClick={handleClickShowPassword} cursor={'pointer'}/>
        ) : (
          <VisibilityOffIcon onClick={handleClickShowPassword} cursor={'pointer'}/>
        )}
      </HStack>
      <Loader active={isLoading} />
      <HStack max align={"center"} justify={"center"}>
        <Button
          colorScheme={"telegram"}
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Войти
        </Button>
      </HStack>
      <VStack max>
        <HStack max justify={'center'}>
          Нет аккаунта?
        </HStack>
        <HStack max justify={'center'}>
          <Button onClick={() => setShowSign(true)} variant={'ghost'} colorScheme={'green'}>
            Зарегистрироваться
          </Button>
        </HStack>
      </VStack>

    </VStack>
  );
};

export default AuthByEmail;
