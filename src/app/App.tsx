import {FC, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthPage from 'pages/AuthPage/AuthPage';
import MapPage from 'pages/MapPage/MapPage';
import './styles/index.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useCardsStore} from 'features/AuthByEmail/models/authStore';
import GroupPage from 'pages/GroupPage/GroupPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import RatingPage from 'pages/RatingPage/RatingPage';
import useProfile from 'app/hooks/useProfile';

interface AppProps {

}

const App: FC<AppProps> = ({}) => {

  const auth = useCardsStore(state => state.auth)

  useProfile()



  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
      <ToastContainer/>
    </>

  );
};

export default App;
