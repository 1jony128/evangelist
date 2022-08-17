import React, { useEffect, useState } from 'react';


import './accept/scss/app.scss'
import 'react-toastify/dist/ReactToastify.css';
import Map from './pages/Map';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './pages/Login';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [auth, setAuth] = useState()
 

  return (
    <div className="App">
      <BrowserRouter>
      {
        auth ?
        <Routes>       
          <Route path='/*' element={<Map />}/>
        </Routes>
        :
        <Routes>       
          <Route path='/*' element={<Login />}/>
        </Routes>
      }
        
      </BrowserRouter>
       
    </div>
  );
}

export default App;
