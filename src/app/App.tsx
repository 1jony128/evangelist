import React, { Suspense} from "react";
import {LoginPage} from 'pages/LoginPage';
import 'antd/dist/antd.css';
import "app/styles/app.scss"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getAuth} from 'entities/FormLogin/models/selectors/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ReactNode} from 'react';
import {MainPage} from 'pages/MainPage';

const App = () => {

    const auth = useSelector(getAuth)

    return (
        <div className={"app"}>
            <BrowserRouter>
                {
                    auth ?
                        <Suspense fallback={<>...</>}>
                            <Routes>
                                <Route path='/*' element={<MainPage />}/>
                            </Routes>
                        </Suspense>
                        :
                        <Suspense fallback={<>...</>}>
                            <Routes>
                                <Route path='/*' element={<LoginPage />}/>
                            </Routes>
                        </Suspense>
                }
                </BrowserRouter>
            <ToastContainer />
        </div>
    );
};

export default App;