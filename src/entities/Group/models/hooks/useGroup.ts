import { useEffect } from "react";
import { useGroupsStore } from "@/entities/Group/models/store/useGroupStore";
import { selectSetCurrentGroup } from "@/entities/Group/models/selectors";
import { useQuery } from "react-query";
import { GroupServices } from "@/entities/Group/models/services/GroupServices";
import { useUserStore } from "@/entities/User/models/store/useUserStore";
import { selectUser } from "@/entities/User/models/selectors";

const useGroup = () => {
  const setCurrentGroup = useGroupsStore(selectSetCurrentGroup);

  const user = useUserStore(selectUser);

  const { data } = useQuery(
    // @ts-ignore
    user?.id && ["allGroups", user.id],
    () => GroupServices.AllGroups(user?.id),
    {
      onSuccess: ({}) => {},
    }
  );

  useEffect(() => {
    const currentGroup = localStorage.getItem("group_id");
    if (currentGroup) {
      setCurrentGroup(JSON.parse(currentGroup));
    } else {
      if (data) setCurrentGroup(data.data[0]);
    }
  }, [data]);
};

export default useGroup;
