import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminLogin from './adminComponents/AdminLogin';
import User from './userComponents/User';
import Register from './userComponents/user/registerComponents/Register';
import Login from './userComponents/user/loginComponents/login';
import EmailVerify from './userComponents/user/registerComponents/emailVerify';
import ExpertSignup from './userComponents/expert/authentication/ExpertSignup';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User />} />
      <Route path='/admin' element={<AdminLogin />}/>
      <Route path='/registerUser' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/:id/verify/:token' element={<EmailVerify/>} />   
      <Route path='/expertSignUp' element={<ExpertSignup />} />
      <Route path='/expertHome' element={<ExpertSignup />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

