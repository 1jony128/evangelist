import {Accordion, Text} from '@chakra-ui/react';
import cls from './Groups.module.scss';
import GroupAccordion from '@/entities/Group/ui/GroupAccordion';
import {FC} from 'react';
import {useQuery} from 'react-query';
import {GroupServices} from '@/entities/Group/models/services/GroupServices';
import {useUserStore} from '@/entities/User/models/store/useUserStore';
import {selectUser} from '@/entities/User/models/selectors';
import {useGroupsStore} from '@/entities/Group/models/store/useGroupStore';
import {selectGroups, selectSetGroups} from '@/entities/Group/models/selectors';
import Loader from '@/shared/ui/Loader/Loader';
import {VStack} from '@/shared/ui/Stack';

type GroupsAccordionProps = {
};

const Groups: FC<GroupsAccordionProps> = () => {
  const user = useUserStore(selectUser);

  const setGroups = useGroupsStore(selectSetGroups);
  const groups = useGroupsStore(selectGroups);

  console.log(user)


  const { isLoading, error, data } = useQuery(
    // @ts-ignore
    user?.id && ["allGroups", user.id],
    () => GroupServices.AllGroups(user?.id),
    {
      onSuccess: ({ data }) => {
        setGroups(data);
      },
    }
  );

  if (isLoading) {
    return <Loader active={isLoading} />;
  }

  if (!groups || groups.length === 0) {
    return <VStack>
      <Text padding={'1'} pl={'4'} >Групп не обнаружено.</Text>
      <Text padding={'1'} pl={'4'} flexWrap={'wrap'} >  Вступите в группу, чтобы пользоваться приложением.</Text>
    </VStack>
  }

  console.log(groups);

  return (
    <Accordion allowMultiple className={cls.Groups}>
      {groups.map((group) => (
        <GroupAccordion key={group.id} group={group} />
      ))}
    </Accordion>
  );
};

export default Groups;
