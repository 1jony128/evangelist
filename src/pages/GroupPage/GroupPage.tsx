import {FC} from 'react';
import Layout from '@/widgets/Layout/ui/Layout';
import GroupsAccordion from '@/entities/Group/ui/Groups';
import {Text} from '@chakra-ui/react';
import AddGroup from '@/features/addGroup/ui/AddGroup';
import {SignGroup} from '@/features/SignGroup';
import {HStack, VStack} from '@/shared/ui/Stack';
import cls from './GroupPage.module.scss';

interface GroupPageProps {}

export const GroupPage: FC<GroupPageProps> = ({}) => {
  return (
    <Layout>
      <VStack className={cls.Wrapper} gap={"32"}>
        <Text title={"Ваши группы"} fontSize={"24"} pl={"4"}>
          Ваши группы
        </Text>
        <GroupsAccordion />
        <HStack max justify={"between"} gap={"16"}>
          <AddGroup />
          <SignGroup />
        </HStack>
      </VStack>
    </Layout>
  );
};

export default GroupPage;
