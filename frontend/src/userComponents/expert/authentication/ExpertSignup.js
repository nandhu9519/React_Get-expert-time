import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
import './authentication.css'
import Header from '../../Header';
import expertValidation from './ExpertSignupValidation'; 
import axios from 'axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function ExpertSignup() {
  const initialState = {email:"",password:"",confirmPassword:""}
  const loginInitialState = {loginEmail:"",loginPassword:""}
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loginValues, setLoginValues] = useState(loginInitialState);
  const [signUpSubmitStat, setSignUpSubmitStat] = useState(false);
  const [signupConfirmation, setSignupConfirmation] = useState({});
  const [signupError, setSignupError] = useState(false);
  const navigate = useNavigate();
  const handleLoginChange = (e)=>{
    const {name,value} = e.target
    setLoginValues({...loginValues,[name]:value})
    console.log(loginValues);
  }
  const handleSignupChange = (e)=>{
    const {name,value}=e.target
    setValues({...values,[name]:value})
  }
  const signUpSubmit = async(e)=>{
    console.log('1234');
    e.preventDefault();
    setErrors(expertValidation(values))
    setSignUpSubmitStat(true)
    if(signUpSubmitStat){
      try{
        var response =await axios({method:"POST",
        url:'http://localhost:5000/users/api/expertSignUp',
        data:values})
        if(response.data.status){
          
          setSignupConfirmation(response)
        }
      }catch(error){
        setSignupError(error.response.data.message)
      }
    }

  }
  const handleLoginSubmit = async()=>{
    try{
      console.log('noway',loginValues);
      let response = await axios({
        method:'POST',
        url:'http://localhost:5000/users/api/expertLogin',data:loginValues}) 
        if(response){
          localStorage.setItem('userInfo',JSON.stringify(response.data.userExist)); 
          navigate('/')
        }
    }
    catch(error){

    }
  }
  useEffect(() => {
    
      $(document).ready(function(){
        $('.login-info-box').fadeOut();
        $('.login-show').addClass('show-log-panel');
    $('input[type="radio"]').on('change',function() {
        if($('#log-reg-show').is(':checked')) {
            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();
            $('.white-panel').removeClass('right-log');
            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
        }
           if($('#log-login-show').is(':checked')) {
            $('.register-info-box').fadeOut(); 
            $('.login-info-box').fadeIn();
            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel'); 
        }
    });
}); 
  }, []);
  
  return (
    <>
    <Header />
    <div class="login-reg-panel">
            <div class="login-info-box">
                <h2>Have an account?</h2>
                
                <label id="label-register" for="log-reg-show">Login</label>
                <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
            </div>
                        
            <div class="register-info-box">
                <h2>Are you an Expert..?Don't have a account?</h2>
                
                <label id="label-login" for="log-login-show">Register</label>
                <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
            </div>
                        
            <div class="white-panel">
                <div class="login-show">
                <h2>LOGIN</h2>
                <form >
                <input type="text" placeholder="Email" name="loginEmail" value={loginValues.loginEmail} onChange={handleLoginChange} />
                <input type="password" placeholder="Password" name="loginPassword" value={loginValues.loginPassword} onChange={handleLoginChange}/>
                <input type="button" value="Login" onClick={handleLoginSubmit}/>
                </form>
                </div>
                <div class="register-show">
                <h2>REGISTER</h2>
                <form onSubmit={signUpSubmit}>
                <input type="text" placeholder="Email" name="email" value={values.email} onChange={handleSignupChange} />
                {errors.email && (
                      <p className="errors">{errors.email}</p>
                    )}
                <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleSignupChange}/>
                {errors.email && (
                      <p className="errors">{errors.password}</p>
                    )}
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={handleSignupChange} />
                {errors.email && (
                      <p className="errors">{errors.confirmPassword}</p>
                    )}
                    {signupError && <Alert severity="error">{signupError}</Alert> }
                    {signupConfirmation.status && <Alert severity="success">{signupConfirmation.data.message}</Alert> }
                  
                <input type="submit" onClick={handleSignupChange} value="Register" />
                </form>
                </div>
            </div>
            </div>
    </>
  );
}

export default ExpertSignup;
