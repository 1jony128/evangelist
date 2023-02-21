import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import cls from "./ProfileCard.module.scss";
import { HStack, VStack } from "shared/ui/Stack";
type ProfileProps = {
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  numNewspapers: number;
  numPoints: number;
};

const ProfileCard: React.FC<ProfileProps> = ({
  name,
  avatarUrl,
  phoneNumber,
  numNewspapers,
  numPoints,
}) => {
  return (
    <VStack gap={"32"} className={cls.ProfileCard} align={"center"}>
      {/* @ts-ignore */}
      <Avatar src={avatarUrl} alt={name} size="2xl" />
      <VStack align="center" gap={"16"} max>
        <HStack gap={"16"}>
          <Text fontWeight="bold">{name}</Text>
          <Text>{phoneNumber}</Text>
        </HStack>
        <HStack gap={"16"}>
          <Text fontWeight="bold">{numNewspapers}</Text>
          <Text>Розданных газет</Text>
        </HStack>
        <HStack gap={"16"}>
          <Text fontWeight="bold">{numPoints}</Text>
          <Text>Посещенных мест</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProfileCard;
