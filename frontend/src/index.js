import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminLogin from './adminComponents/AdminLogin';
import './index.css';
import User from './userComponents/User';
import Register from './userComponents/user/Register';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User />} />
      <Route path='/admin' element={<AdminLogin />}/>
      <Route path='/registerUser' element={<Register />} />


    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

