import { FC, useEffect, useState } from "react";
import Layout from "widgets/Layout/ui/Layout";

import { Box, Flex, Image, Text, Avatar, Badge } from "@chakra-ui/react";
import { HStack } from "shared/ui/Stack";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { User } from "entities/Group/models/types";
import { GroupServices } from "entities/Group/models/services/GroupServices";
import { useGroupsStore } from "entities/Group/models/store/useGroupStore";
import {selectGroups, selectSetGroups} from 'entities/Group/models/selectors';
import { PointServices } from "entities/Point/models/services/PointServices";
import { alert } from "shared/lib/alerts";
import { Data } from "pages/ProfilePage/models/hooks/useCountPoints";
import Loader from "shared/ui/Loader/Loader";
import {IUser} from 'entities/User/models/types/userTypes';
import {useUserStore} from 'entities/User/models/store/useUserStore';
import {selectUser} from 'entities/User/models/selectors';

const users = [
  {
    id: 1,
    name: "John Doe",
    city: "New York",
    photo: "https://example.com/john-doe.jpg",
    newspapers: 42,
    // Дополнительные данные, которые ты можешь использовать
    // ...
  },
  {
    id: 2,
    name: "Jane Smith",
    city: "London",
    photo: "https://example.com/jane-smith.jpg",
    newspapers: 28,
    // Дополнительные данные, которые ты можешь использовать
    // ...
  },
  // Другие пользователи
];

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

  console.log(groups)
  const { isLoading, error, data } = useQuery<"_", "_", AxiosResponse<User[]>>(
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
    error: isErrorCount,
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

      <Loader active={isLoading} />
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
