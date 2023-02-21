import cls from "./MyDrawer.module.scss";
import { classNames } from "shared/lib/classNames";
import { FC, ReactNode, useEffect } from "react";
import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface MyDrawerProps {
  className?: string;
  active: boolean;
  setActive: () => void;
  children: ReactNode;
  header: string;
}

const MyDrawer: FC<MyDrawerProps> = ({
  className,
  active,
  setActive,
  children,
  header,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (active) {
      onOpen();
    } else {
      onClose();
    }
  }, [active]);

  const handlerClose = () => {
    onClose();
    setActive();
  };

  return (
    <div className={classNames(cls.MyDrawer, {}, [className])}>
      <Drawer placement={"bottom"} onClose={handlerClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            className={cls.Header}
          >
            {header}
            <CloseButton onClick={handlerClose} />
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MyDrawer;
