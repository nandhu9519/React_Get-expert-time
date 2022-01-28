import React from 'react';

function validation(values) {
    let errors = {};
  if(!values.firstName){
             errors.firstName = "First Name is required"
         }
         if(!values.lastName){
            errors.lastName = "Last Name is required"
        }
        
        if(!values.email){
            errors.email = "Email is required"
        }else if(!/\S+@\S+\.+\S/.test(values.email)){
            errors.email = "Invalid Email"
        }
        if(!values.password){
            errors.password = "Password is required"

        }else if(values.password.length < 5){
            errors.password = "Password must have minimum 5 characters"
        }else if(values.password != values.confirmPassword){
            errors.confirmPassword = "Passwords does not match"
        }
        return errors;  
}

export default validation;
