import { useEffect } from "react";
import { useMutation } from "react-query";
import { AuthService } from "@/features/AuthByEmail/models/services/auth";
import { alert } from "@/shared/lib/alerts";
import { useCardsStore } from "@/features/AuthByEmail/models/authStore";
import { selectSetId } from "@/entities/User/models/selectors";
import { useUserStore } from "@/entities/User/models/store/useUserStore";

const useSignIn = () => {
  const setAuth = useCardsStore((state) => state.setAuth);

  const setId = useUserStore(selectSetId);

  const { mutate, error, isLoading } = useMutation(
    "signByEmail",
    AuthService.SignByEmail,
    {
      onSuccess: (data) => {
        setAuth(true);
        setId(data.data.id);
        localStorage.setItem("user_id", data.data.id);
        localStorage.setItem("token_user", data.data.token);
        alert("Вы успешно зарегистрировались!", "success");
      },
      onError: (error: any) => {
        // @ts-ignore
        alert(error.message, "error");
      },
    }
  );

  useEffect(() => {
    if (localStorage.getItem("token_user")) {
      setAuth(true);
    }
  }, []);

  return {
    mutate,
    error,
    isLoading,
  };
};

export default useSignIn;
