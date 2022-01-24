import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLogin from './adminComponents/AdminLogin';
import './index.css';
import User from './userComponents/user/User';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User />} />
      <Route path='/admin' element={<AdminLogin />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

