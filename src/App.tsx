import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Main from './Body/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MessageProvider } from './Notif/Info_Provider';
import LoadingPage from './Pages/LoadingPage';
import NotFoundPage from './Pages/NotFoundPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <MessageProvider>
              <Main/>
          </MessageProvider>
        }/>
         <Route path='*' element={
          <NotFoundPage/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
