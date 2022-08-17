import { useState } from "react";



const useDialog = () => {
    const [open, setOpen] = useState(false);
  
    const handleCloseOpen = () => {
      setOpen(!open);
    };

    return {open, handleCloseOpen}
}

export default useDialog;