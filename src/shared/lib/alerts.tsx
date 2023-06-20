/* eslint-disable jsx-a11y/alt-text */
import { toast } from "react-toastify";

type toastType = "success" | "error" | "info";

export const alert = (text: string, type: toastType) => {
  toast[type](text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
