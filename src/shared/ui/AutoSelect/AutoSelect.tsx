import {FC, memo, useState} from 'react';
import Select, {ActionMeta, SingleValue} from 'react-select';
import cls from './AutoSelect.module.scss';
import {useQuery} from 'react-query';
import {AutoSelectService} from 'shared/ui/AutoSelect/services/autoSelect';
import {useUserStore} from 'entities/User/models/store/useUserStore';
import {useGroupsStore} from 'entities/Group/models/store/useGroupStore';

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

const AutoSelect: FC<AutoSelectProps> = ({
  setValue,
  label,
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const {currentGroup} = useGroupsStore()

  const {isLoading, data, error} = useQuery('users', () => AutoSelectService.getOptions("group/" + currentGroup?.id + "/get-users/"), {
    onSuccess:() => {
      console.log("")
    },
    select: (data) => data.map((item: any) => ({
      value: item.id, label: item.name
    }))
  })

  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setValue(newValue)
    setSelectedOption(newValue);
  };

  return (
    <Select
      className={cls.AutoSelect}
      value={selectedOption}
      onChange={handleChange}
      options={data || []}
      maxMenuHeight={400}
      placeholder={label}
      isLoading={isLoading}
      defaultInputValue={value || undefined}
    />
  );
};

export default memo(AutoSelect);
