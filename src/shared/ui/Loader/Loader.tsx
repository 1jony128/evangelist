import cls from "./Loader.module.scss"
import {classNames} from "@/shared/lib/classNames";
import {FC} from "react";
import {HStack} from '@/shared/ui/Stack';

interface LoaderProps {
    className?: string
    active: boolean
}

const Loader: FC<LoaderProps> = ({className, active}) => {

  if(active){
    return (
      <HStack max className={cls.container} justify={'center'}>
        <div className={classNames(cls.lds_ripple, {}, [className])}>
          <div></div>
          <div></div>
        </div>
      </HStack>
    );
  }

  return null
};

export default Loader;
