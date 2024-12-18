const User=require('../model/userModel')
const crypto=require('crypto')
const bcrypt=require('bcrypt')
const mailSender=require('../utils/mailSender')


//resetPasswordToken
exports.resetPasswordToken=async(req,res)=>{
    try{
        //get email from req body
        const email=req.body.email
        //check user for this email,email validation
        const user=await User.findOne({email:email})
        //validate the user 
        if(!user){
            return res.json({
                success:false,
                message:`This Email: ${email} is not Registered with Us Enter a Valid Email `,
            })
        }

        //genarate token
        const token=crypto.randomBytes(20).toString("hex")

        console.log( "Token reset",token)

        // Use findOneAndUpdate instead of findByIdAndUpdate
        // update user by adding token and expiration time
        const updatedDetails=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+3600000,
            },
            {new:true}
        )

        console.log("Details",updatedDetails)

         const url = `http://localhost:3000/update-password/${token}`
         console.log("url",url)
        //create URL
        //const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`


        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
        
        //return response
        res.json({
            success:true,
            message:"Email Sent Successfully, Please Check Your Email to Continue Further",
        })
    }
    catch(error){
        console.log(error)
        return res.json({
            error:error.message,
            success:false,
            message:`Some Error in Sending the Reset Message`,
        })
    }
}


//resetPassword
exports.resetPassword=async(req,res)=>{
    try{
        //data fetch
        const {password, confirmPassword,token}=req.body
        //validation
        if(confirmPassword !== password){
            return res.json({
                success:false,
                message:"Password and Confirm Password Does not Match",
            })
        }
        //get userdetails from db using token
        const userDetails=await User.findOne({token:token})
        //if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is Invalid",
            })
        }
        //token time check
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success:false,
                message:`Token is expired, Please Regenerate Your Token`,
            });
        }
        //hash pwd
        const encryptedPassword=await bcrypt.hash(password,10)
        // Use findOneAndUpdate instead of findByIdAndUpdate
        await User.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true}
        )

        res.json({
            success:true,
            message:`Password Reset Successful`,
        })
    }
    catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:"Some Error in Updating the password",
        })
    }
}