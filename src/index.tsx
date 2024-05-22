import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';
import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAriz220md6e-23od8k4EUViSvpq_IjBvM",
  authDomain: "cp-sodeistvie.firebaseapp.com",
  databaseURL: "https://cp-sodeistvie-default-rtdb.firebaseio.com",
  projectId: "cp-sodeistvie",
  storageBucket: "cp-sodeistvie.appspot.com",
  messagingSenderId: "415679728441",
  appId: "1:415679728441:web:d589985b1ac844aa2476e8"
};

// Initialize Firebase

type TypeFire = { app: firebase.FirebaseApp; }

const app = initializeApp(firebaseConfig);

export const Context = createContext<TypeFire | null>(null)


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Context.Provider value={{app}}>
    <App />
  </Context.Provider>

);
