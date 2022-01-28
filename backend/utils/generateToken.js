const jwt = require('jsonwebtoken')


const generateToken = (id) =>{
    console.log('token',id);
    const tok= jwt.sign({ id },'nan123', {expiresIn:"30d"})
    console.log('asdfasd',tok);
    return tok

}

module.exports = generateToken