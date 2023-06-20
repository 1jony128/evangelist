import {useState} from 'react';
import {AccordionButton, AccordionItem, AccordionPanel, Checkbox, Text, Tooltip, VStack,} from '@chakra-ui/react';
import {IGroup, User} from 'entities/Group/models/types';
import {useQuery} from 'react-query';
import {GroupServices} from 'entities/Group/models/services/GroupServices';
import Loader from 'shared/ui/Loader/Loader';
import {AxiosResponse} from 'axios';
import {HStack} from 'shared/ui/Stack';
import {selectCurrentGroup, selectSetCurrentGroup} from 'entities/Group/models/selectors';
import {useGroupsStore} from 'entities/Group/models/store/useGroupStore';
import {alert} from 'shared/lib/alerts';

type GroupAccordionProps = {
  group: IGroup;
};

function GroupAccordion({ group }: GroupAccordionProps) {
  const [checkedUsers, setCheckedUsers] = useState<User[]>([]);

  const { isLoading, error, data } = useQuery<"_", "_", AxiosResponse<User[]>>(
    // @ts-ignore
    group?.id && ["AllGroupUsers", group.id],
    () => GroupServices.AllGroupUsers(group?.id),
    {
      onSuccess: ({ data }) => {},
    }
  );


  const currentGroup = useGroupsStore(selectCurrentGroup)
  const setCurrentGroup = useGroupsStore(selectSetCurrentGroup)

  const onToggleGroup = () => {
    setCurrentGroup({
      id: group.id,
      name: group.name,
      users: []
    })
    localStorage.setItem('group_id', JSON.stringify({
      id: group.id,
      name: group.name
    }))
    alert('Теперь вы действуете от группы ' + group.name, 'info')
  }

  const handleUserToggle = (user: User) => {
    if (checkedUsers.includes(user)) {
      setCheckedUsers(
        checkedUsers.filter((checkedUser) => checkedUser !== user)
      );
    } else {
      setCheckedUsers([...checkedUsers, user]);
    }
  };

  if (isLoading) {
    return <Loader active={isLoading} />;
  }

  console.log(currentGroup)

  return (
    <AccordionItem>
        <AccordionButton>
          <HStack gap={'16'}>
            {group.name}
            <Tooltip label={'Действовать от группы ' + group.name + "?"}>
            <Checkbox onChange={onToggleGroup} isChecked={group.id === currentGroup?.id}/>
            </Tooltip>
          </HStack>
        </AccordionButton>

      <AccordionPanel>
        <VStack align="stretch" spacing={4}>
          {data?.data &&
            data?.data.map((user) => (
              <Checkbox
                key={user.id}
                isChecked={checkedUsers.includes(user)}
                onChange={() => handleUserToggle(user)}
              >
                {user.name}
              </Checkbox>
            ))}
          {!data?.data && (
            <Text fontSize={"xl"}>Пользователей в группе нет</Text>
          )}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default GroupAccordion;
