import {FC, useEffect, useState} from 'react';
import Layout from '@/widgets/Layout/ui/Layout';

import {Box, Flex, Text} from '@chakra-ui/react';
import {HStack} from '@/shared/ui/Stack';
import {useMutation, useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import {User} from '@/entities/Group/models/types';
import {GroupServices} from '@/entities/Group/models/services/GroupServices';
import {useGroupsStore} from '@/entities/Group/models/store/useGroupStore';
import {selectGroups, selectSetGroups} from '@/entities/Group/models/selectors';
import {PointServices} from '@/entities/Point/models/services/PointServices';
import {alert} from '@/shared/lib/alerts';
import {Data} from '@/pages/ProfilePage/models/hooks/useCountPoints';
import Loader from '@/shared/ui/Loader/Loader';
import {useUserStore} from '@/entities/User/models/store/useUserStore';
import {selectUser} from '@/entities/User/models/selectors';

interface RatingPageProps {}

const RatingPage: FC<RatingPageProps> = ({}) => {
  const groups = useGroupsStore(selectGroups);

  const [users, setUsers] = useState<User[]>([])

  const setGroups = useGroupsStore(selectSetGroups);
  const user = useUserStore(selectUser);

  const { isLoading: IsLoadingGroups } = useQuery(
    // @ts-ignore
    user?.id && ["allGroups", user.id],
    () => GroupServices.AllGroups(user?.id),
    {
      onSuccess: ({ data }) => {
        setGroups(data);
      },
    }
  );
  const { isLoading } = useQuery<any, any, AxiosResponse<User[]>>(
    // @ts-ignore
    groups && groups[0]?.id && ["AllGroupUsers", groups[0]?.id],
    () => GroupServices.AllGroupUsers(groups![0]!.id),
    {
      onSuccess: ({ data }) => {
        setUsers(data);
      },
    }
  );

  const [countPaper, setCountPaper] = useState([
    {
      countNewsPaper: 0,
      countPoint: 0,
    },
  ]);

  const {
    mutate,
    isLoading: isLoadingCount,
  } = useMutation("countPoints", PointServices.AllPointsById, {
    // @ts-ignore
    onSuccess: (data: Data[]) => {
      let total = 0;
      console.log(data);
      data.forEach((item) => {
        total += parseInt(item.count);
      });
      setCountPaper((prevState) => [
        ...prevState,
        {
          countNewsPaper: total,
          countPoint: data.length,
        },
      ]);
    },
    onError: (error: any) => {
      // @ts-ignore
      alert(error.message, "error");
    },
  });

  useEffect(() => {
    if (users) {
      users.forEach((user) => {
        mutate(`${user?.id}`);
      })

    }
  }, [users]);

  return (
    <Layout>

      <Loader active={isLoading || IsLoadingGroups || isLoadingCount} />
      <Box p={4} width={"100%"}>
        <Text fontSize={'xx-large'}>Раздел находится в разработке</Text>
        {users.map((user, index) => (
          <Flex
            key={user.id}
            align="center"
            mb={4}
            justifyContent={"space-between"}
          >
            {/*<Avatar size="md" name={user.name} src={user.photo} />*/}
            <Box ml={3} flex={1}>
              <Text fontSize="xl" fontWeight="bold">
                {user.name}
              </Text>
              <HStack gap={"16"}>
                {/*<Text>{user.city}</Text> @ts-ignore*/}
                <Text fontSize="xs">{countPaper && countPaper.length && countPaper[index]?.countNewsPaper} газеты</Text>
              </HStack>
            </Box>
          </Flex>
        ))}
      </Box>
    </Layout>
  );
};

export default RatingPage;
