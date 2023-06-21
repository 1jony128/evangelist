import {FC, Suspense, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from '@/pages/AuthPage/AuthPage';
import MapPage from '@/pages/MapPage/MapPage';
import './styles/index.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useCardsStore} from '@/features/AuthByEmail/models/authStore';
import GroupPage from '@/pages/GroupPage/GroupPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import RatingPage from '@/pages/RatingPage/RatingPage';
import useProfile from '@/app/hooks/useProfile';
import useGroup from '@/entities/Group/models/hooks/useGroup';
import {useQuery} from 'react-query';
import {GroupServices} from '@/entities/Group/models/services/GroupServices';
import {useUserStore} from '@/entities/User/models/store/useUserStore';
import {selectUser} from '@/entities/User/models/selectors';

interface AppProps {

}

const App: FC<AppProps> = ({}) => {

  const [active, setActive] = useState(false)

  const auth = useCardsStore(state => state.auth)
  const user = useUserStore(selectUser);

  const navigate = useNavigate()

  useProfile()
  useGroup()

  console.log("user: ", user)

  useQuery(
    // @ts-ignore
    user?.id && ["allGroupsInit", user.id],
    () => GroupServices.AllGroups(user?.id),
    {
      onSuccess: ({ data }) => {
        console.log(data)
        if(data.length > 0){
          setActive(true);
        } else {
          navigate('/group')
          setActive(false)
        }

      },
      onError: () => {
        setActive(false)
        navigate('/group')
      }
    }
  );


  if(auth && !active){
    return (
      <Suspense fallback={'...'}>
        <Routes>
          <Route path="/group" element={<GroupPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          </ Routes>
      </Suspense>
    )
  }

  return (
    <>

        {
          auth ?
            <Suspense fallback={'...'}>
              <Routes>
                <Route path="/*" element={<MapPage/>}/>
                <Route path="/group" element={<GroupPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/rating" element={<RatingPage/>}/>
              </Routes>
            </Suspense>
            :
            <Suspense fallback={'...'}>
              <Routes>
                <Route path="/*" element={<AuthPage/>}/>
              </Routes>
            </Suspense>
        }
      <ToastContainer/>
    </>

  );
};

export default App;
