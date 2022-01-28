var db = require('../config/connections')
var collections = require('../config/collections');
var bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const crypto = require('crypto')
const generateEmail = require('../utils/generateEmail')
const objectId = require('mongodb').ObjectId

module.exports = {
    userRegister : async(req,res) =>{
        const {firstName,lastName,email,password} = req.body; 
        console.log(password);
        let userExist =await db.get().collection(collections.USERS).findOne({email:email})

        if(userExist){
            res.status(201).json({status:false})
            
        }else{
              let bcryptpassword = await bcrypt.hash(password,10);
              
               await db.get().collection(collections.USERS).insertOne({firstName : firstName,
                lastName : lastName,
                email : email,
                password : bcryptpassword,
                user:true,
                emailValidation:false

            });
            let userInfo = await db.get().collection(collections.USERS).findOne({email:email})
            const token = await ({
                userId: userInfo._id,
                token:crypto.randomBytes(32).toString('hex')
            });
            await db.get().collection(collections.TOKEN).insertOne(token)
            const url = `${process.env.BASE_URL}${userInfo._id}/verify/${token.token}`;
            await generateEmail(userInfo.email,"verify email",url);

            res.status(201).json({status:true});
        }
    },
    userlogin:async(req,res)=>{
        const {email,password} = req.body;

        let userExist = await db.get().collection(collections.USERS).findOne({email:email})
        console.log('asd',userExist,password);
        if(userExist){
             bcrypt.compare(password,userExist.password).then((status)=>{
                 console.log(status);
                if(status && userExist.emailValidation){
                    res.status(201).json({
                        _id: userExist._id,
                        name: userExist.firstName,
                        email: userExist.email,
                        user:true,
                        token:generateToken(userExist._id)})
                }else if(userExist.emailValidation==false){

                }
                else{
                    res.status(201).json({status:false})
                }
            })   
        }
    },
    verifyEmail:async(req,res)=>{
        try{
            const user = await db.get().collection(collections.USERS).findOne({_id:objectId(req.params.id) })
            console.log('verify email',objectId(req.params.id));

            if(!user){
                return res.status(400).send({message:"Invalid token"})
            }
            const token  = await db.get().collection(collections.TOKEN).findOne({userId:user._id,token:req.params.token})
            if(!token){
                return res.status(400).send({message:"Invalid token"})   
            }
            console.log('123',user,'token',token);
            await db.get().collection(collections.USERS).updateOne({_id:objectId(req.params.id) },{$set:{emailValidation:true}});
            let response = await db.get().collection(collections.TOKEN).deleteOne({userId:objectId (req.params.id)})
            console.log('response asdfasdf',response);
            res.status(200).json({status:true})
        }
        catch(error){
            res.status(500)
        }
    }
}