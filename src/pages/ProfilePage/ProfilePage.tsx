import { FC } from "react";
import Layout from "@/widgets/Layout/ui/Layout";
import ProfileCard from "@/widgets/ProfileCard/ProfileCard";
import { useUserStore } from "@/entities/User/models/store/useUserStore";
import useCountPoints from "@/pages/ProfilePage/models/hooks/useCountPoints";
import Loader from "@/shared/ui/Loader/Loader";
import EditProfile from "@/features/editProfile/ui/EditProfile";
import { VStack } from "@/shared/ui/Stack";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const user = useUserStore((state) => state.user);

  const { isLoading, error, countPaper } = useCountPoints();

  return (
    <Layout>
      {<Loader active={isLoading} />}
      {user && (
        <VStack max gap={"32"} align={"center"}>
          <ProfileCard
            name={user.name}
            avatarUrl={user.avatar}
            phoneNumber={user.email}
            numNewspapers={countPaper.countNewsPaper}
            numPoints={countPaper.countPoint}
          />
          <EditProfile />
        </VStack>
      )}
    </Layout>
  );
};

export default ProfilePage;
