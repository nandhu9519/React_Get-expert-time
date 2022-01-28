const nodemailer = require('nodemailer')

module.exports = async(email,subject,text) =>{
    try{
        console.log(process.env.USERNAME,process.env.PASS);
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USERNAME,
                pass:process.env.PASS
            }
        })
        console.log('2');
        await transporter.sendMail({
            from:process.env.USERNAME,
            to:email,
            subject:subject,
            text:text
        })
        console.log('email send'); 
    }
    catch(error){
        console.log('email not send',error);
    }
}