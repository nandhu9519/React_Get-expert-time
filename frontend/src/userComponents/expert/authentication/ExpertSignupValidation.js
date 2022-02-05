function expertValidation(values){
    var errors = {}
    
    if(!values.email){
        errors.email = "Email is required"
    }else if(!/\S+@\S+\.+\S/.test(values.email)){
        errors.email = "Invalid Email"
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    if(values.password != values.confirmPassword){
        errors.confirmPassword = "Password does not match"
    }
    return errors;
}

export default expertValidation;