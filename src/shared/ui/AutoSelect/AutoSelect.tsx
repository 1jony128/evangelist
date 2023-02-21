import { FC, useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import cls from "./AutoSelect.module.scss";
import {useQuery} from 'react-query';
import {AutoSelectService, fetchAutoSelect} from 'shared/ui/AutoSelect/services/autoSelect';
import {useUserStore} from 'entities/User/models/store/useUserStore';
interface AutoSelectProps {
  isDisabled: boolean;
  value: string;
  setValue: (value: SingleValue<Option>) => void;
  label: string;
}

export interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const AutoSelect: FC<AutoSelectProps> = ({
  isDisabled,
  value,
  setValue,
  label,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const {user} = useUserStore()

  const {isLoading, data, error} = useQuery('users', () => AutoSelectService.getOptions("group/" + user?.id + "/get-users/"), {
    onSuccess:() => {
      console.log("")
    },
    select: (data) => data.map((item: any) => ({
      value: item.id, label: item.email
    }))
  })

  console.log(data)

  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setValue(newValue)
    setSelectedOption(newValue);
  };

  console.log(data)

  return (
    <Select
      className={cls.AutoSelect}
      value={selectedOption}
      onChange={handleChange}
      options={data || []}
      maxMenuHeight={400}
      placeholder={label}
      isLoading={isLoading}
    />
  );
};

export default AutoSelect;
