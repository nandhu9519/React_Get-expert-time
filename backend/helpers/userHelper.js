var db = require('../config/connections')
var collections = require('../config/collections');
var bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const crypto = require('crypto')
const generateEmail = require('../utils/generateEmail')
const objectId = require('mongodb').ObjectId
const {OAuth2Client} = require('google-auth-library');
const res = require('express/lib/response');
const client = new OAuth2Client("231700882499-1b30qa5b7vtl8jc4tb4h7hbon88t591r.apps.googleusercontent.com")

module.exports = {
    userRegister : async(req,res) =>{
        const {firstName,lastName,email,password} = req.body; 
        console.log(password);
        let userExist =await db.get().collection(collections.USERS).findOne({email:email})

        if(userExist){
            res.status(403).json({message:"User With Email Already Exist "});
                  
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
        if(userExist == null){
            res.status(403).json({message:"User doesn't exist"})
        }
         else if(userExist && userExist.emailValidation){
             let bcrytSatus = await bcrypt.compare(password,userExist.password)
                 console.log(bcrytSatus);
                if(bcrytSatus){
                    res.status(201).json({
                        _id: userExist._id,
                        name: userExist.firstName,
                        email: userExist.email,
                        user:true,
                        token:generateToken(userExist._id)})
                }else{
                    res.status(401).json({message:"Invalid credantials"})
                }
        }else if(userExist.emailValidation==false){
            res.status(403).json({message:" Please Validate your email and then login"})
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
    },
    googleLogin:(req,res)=>{
        const {tokenId} = req.body;
        client.verifyIdToken({idToken:tokenId,audience:"231700882499-1b30qa5b7vtl8jc4tb4h7hbon88t591r.apps.googleusercontent.com"}).then(async(response)=>{
            const {email_verified,name,email} = response.payload;
            if(email_verified){
                let userExist = await db.get().collection(collections.USERS).findOne({email:email})
                console.log('tatat',userExist);
                if(userExist){
                    console.log('exist');
                    res.status(201).json({
                        _id: userExist._id,
                        name: userExist.name,
                        email: userExist.email,
                        user:true,
                        token:generateToken(userExist._id)})
                }else{
                    await db.get().collection(collections.USERS).insertOne({firstName : name,
                        lastName : "",
                        email : email,
                        password : "",
                        user:true        
                    });
                    let userInfo = await db.get().collection(collections.USERS).findOne({email:email})
                    res.status(201).json({
                        _id: userInfo._id,
                        name: userInfo.firstName,
                        email: userInfo.email,
                        user:true,
                        token:generateToken(userInfo._id)})
                }
            }
        })
    },
    expertSignUp:async(req,res)=>{
        const {email,password}= req.body
        let expertExist =await db.get().collection(collections.EXPERT).findOne({email:email})
        if(expertExist){
            res.status(403).json({message:"Email id already exist"})
        }else{
            let encryptedpassword = await bcrypt.hash(password,10);
            await db.get().collection(collections.EXPERT).insertOne({
                email:email,
                password:encryptedpassword,
                expert:true
            })
            res.status(201).json({message:"Succes-Login to continue",status:true})
        }
    },
    expertLogin:async(req,res)=>{
        const {loginEmail,loginPassword} = req.body;
        console.log(loginEmail,loginPassword);
        let userExist = await db.get().collection(collections.EXPERT).findOne({email:loginEmail});
        if(userExist){
            let bcrytStatus = await bcrypt.compare(loginPassword,userExist.password)
            if(bcrytStatus){
                res.status(201).json({userExist})
            }
        }else{
         res.status(401).json({message:"Invalid Credantials"})   
        }
    }
}