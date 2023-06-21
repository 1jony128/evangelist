import { useEffect } from "react";
import { useAddPointStore } from "@/features/AddPointForm/models/store/addPointStore";
import {
  selectFio,
  selectIsOpen,
  selectMode,
  selectPoint,
  selectSetAddress,
  selectSetComment,
  selectSetCount,
  selectSetFio,
} from "@/features/AddPointForm/models/selectors/addPointSelectors";
import { useUserStore } from "@/entities/User/models/store/useUserStore";

const useInitEditMode = () => {
  const user = useUserStore((state) => state.user);

  const mode = useAddPointStore(selectMode);
  const point = useAddPointStore(selectPoint);
  const isOpen = useAddPointStore(selectIsOpen);

  const setComment = useAddPointStore(selectSetComment);
  const setFio = useAddPointStore(selectSetFio);
  const setAddress = useAddPointStore(selectSetAddress);
  const setCount = useAddPointStore(selectSetCount);
  const fio = useAddPointStore(selectFio);
  useEffect(() => {
    if (mode === "edit" && point) {
      setComment(point.comment);
      setFio({
        id: `${point.userId}`,
        value: point.user_name,
      });
      setAddress(point.address);
      setCount(+point.count);
    } else {
      setComment("");
      setFio(null);
      setCount(25);
    }
  }, [mode, point]);

  useEffect(() => {
    if (user && mode !== "create") {
      console.log("sss");
      setFio({
        id: `${user.id}`,
        value: user.email,
      });
    } else if (point) {
      setFio({
        id: `${point.userId}`,
        value: point.user_name,
      });
    }
  }, [user, isOpen, point]);
};

export default useInitEditMode;
