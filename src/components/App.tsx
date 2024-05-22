import {FC, Suspense, useContext, useEffect} from 'react';
import Navbar from 'components/Navbar';
import Group from 'components/Group';
import Footer from 'components/Footer';
import "../assets/style/index.css"
import Stack from '@mui/material/Stack';
import {useStore} from 'store/useStore';
import {BrowserRouter, useParams} from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import {Context} from 'index';
import { collection, doc, query, getDocs, updateDoc } from "firebase/firestore";
interface AppProps {

}

const App: FC<AppProps> = ({}) => {

  const params = useParams()

  const context = useContext(Context)

  const {setGroups, groups, setId, currentId} = useStore()

  console.log(currentId)


  useEffect(() => {
    if(context?.app){

      const func2 = async () => {
        const db = getFirestore(context.app);
        const groupRef = collection(db, "group");

        await updateDoc(doc(groupRef, "voscresenie"), {
          "grammotes": [
            {
              name: "1",
              photo: "voskresenie/grammotes/0a7a8fb4-2a37-4e18-ab39-24c72cd79789.jpg"
            },
            {
              name: "2",
              photo: "voskresenie/grammotes/44a5d6d2-8f01-44b0-87e0-b1c6ce9812e3.jpg"
            },
            {
              name: "3",
              photo: "voskresenie/grammotes/57863abc-91f7-4637-b3e4-981d0f4ca78f.jpg"
            },
            {
              name: "4",
              photo: "voskresenie/grammotes/98d3675a-bc3d-4d63-9090-a011b412ae98.jpg"
            },
          ]
        });
      }

      // func2()
      const func = async () => {

        const db = getFirestore(context.app);
        console.log(db)
        const q = query(collection(db, "group"));
        const querySnapshot = await getDocs(q);
        const arr: any = []
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        });
        setGroups(arr)
        console.log(arr)
      }
      func()
    }

  },[context?.app])

  useEffect(() => {
    if(window.location.pathname){
      setId((window.location.pathname).slice(1))
    }
  }, [window.location.pathname])


    return (
      <Stack justifyContent={'space-between'} sx={{height: '100vh'}}>
        <Stack>
          <Navbar />
          <Group />
        </Stack>
        <Footer />
      </Stack>
    );
};

export default App;
