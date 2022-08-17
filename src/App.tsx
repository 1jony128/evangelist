import React, { useEffect } from 'react';
import './accept/scss/app.scss'
import 'react-toastify/dist/ReactToastify.css';
import Map from './pages/Map';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
 

  return (
    <div className="App">
       <Map />
    </div>
  );
}

export default App;
