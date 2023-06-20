import cls from "./SignInByEmail.module.scss";
import { classNames } from "shared/lib/classNames";
import { FC, useState } from "react";
import { Button, Heading, Input, Text, Tooltip } from "@chakra-ui/react";
import { HStack, VStack } from "shared/ui/Stack";
import { useSignStore } from "features/SignInByEmail/model/store/signStore";
import { selectSetShowSign } from "features/SignInByEmail/model/selector";
import useInput from "shared/hooks/useInput";
import { alert } from "shared/lib/alerts";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loader from "shared/ui/Loader/Loader";
import useSignIn from "features/SignInByEmail/model/hook/useSignIn";
import { AddressSuggestions } from "react-dadata";

interface SignInByEmailProps {
  className?: string;
}

const SignInByEmail: FC<SignInByEmailProps> = ({ className }) => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const repeatPassword = useInput("");
  const keyAccess = useInput("");
  const city: any = useInput("");
  const [showPassword, setshowPassword] = useState(false);

  const setShowSign = useSignStore(selectSetShowSign);

  const { mutate, error, isLoading } = useSignIn();

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
  console.log(city);

  const onSubmit = async () => {
    if (validation()) return;

    console.log(city);

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      geo_lon: city.value.data.geo_lon,
      geo_lat: city.value.data.geo_lat,
      avatar: "",
      key_access: keyAccess.value,
    };
    mutate(data);
  };

  return (
    <VStack
      className={classNames(cls.SignInByEmail, {}, [className])}
      gap={"16"}
    >
      <Heading>Регистрация</Heading>
      <HStack max align={"center"} justify={"between"} gap={"16"}>
        <Text>Имя</Text>
        <Input placeholder="Имя" value={name.value} onChange={name.onChange} />
      </HStack>
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
          <RemoveRedEyeIcon
            onClick={handleClickShowPassword}
            cursor={"pointer"}
          />
        ) : (
          <VisibilityOffIcon
            onClick={handleClickShowPassword}
            cursor={"pointer"}
          />
        )}
      </HStack>
      <HStack max align={"center"} justify={"between"} gap={"16"}>
        <Text>повторить пароль:</Text>
        <Input
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={repeatPassword.value}
          onChange={repeatPassword.onChange}
        />
        {!showPassword ? (
          <RemoveRedEyeIcon
            onClick={handleClickShowPassword}
            cursor={"pointer"}
          />
        ) : (
          <VisibilityOffIcon
            onClick={handleClickShowPassword}
            cursor={"pointer"}
          />
        )}
      </HStack>
      <HStack max align={"center"} justify={"between"} gap={"16"}>
        <Tooltip label={"Уточняйте ключ доступа у администраторов приложения"}>
          <Text>Ключ доступа</Text>
        </Tooltip>
        <Input
          placeholder="Ключ доступа"
          value={keyAccess.value}
          onChange={keyAccess.onChange}
        />
      </HStack>
      <HStack gap={"16"} max>
        <Text>Адрес</Text>
        <AddressSuggestions
          token="02064c1ca019072ad521dd88b722db1019854ac2" // @ts-ignore
          value={city.value} // @ts-ignore
          onChange={city.setValue}
          delay={500}
        />
      </HStack>
      <Loader active={isLoading} />
      <HStack max align={"center"} justify={"center"}>
        <Button
          colorScheme={"telegram"}
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </HStack>
      <VStack max>
        <HStack max justify={"center"}>
          Уже есть аккаунт?
        </HStack>
        <HStack max justify={"center"}>
          <Button
            onClick={() => setShowSign(false)}
            variant={"ghost"}
            colorScheme={"green"}
          >
            Войти
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SignInByEmail;
