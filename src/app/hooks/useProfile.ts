import { useEffect } from "react";
import { useQuery } from "react-query";
import { AutoSelectService } from "shared/ui/AutoSelect/services/autoSelect";
import { IUser } from "entities/User/models/types/userTypes";
import { useUserStore } from "entities/User/models/store/useUserStore";
import { selectId, selectSetId } from "entities/User/models/selectors";

const useProfile = () => {
  const { setUser } = useUserStore();

  const id = useUserStore(selectId);
  const setId = useUserStore(selectSetId);

  console.log(id);

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setId(`${localStorage.getItem("user_id")}`);
    }
  }, []);

  const { isLoading, data, error } = useQuery<"", "", IUser>( // @ts-ignore
    id && ["profile", id],
    () => AutoSelectService.getOptions("users/" + id),
    {
      onSuccess: (data) => {
        setUser(data);
        console.log("ddd");
      },
    }
  );
};

export default useProfile;
