import React from 'react';

function loginValidation(values) {
    console.log('login validation');
    let errors = {};
        
        if(!values.email){
            errors.email = "Email is required"
        }else if(!/\S+@\S+\.+\S/.test(values.email)){
            errors.email = "Invalid Email"
        }
        if(!values.password){
            errors.password = "Password is required"

        }
        return errors;  
}

export default loginValidation;
