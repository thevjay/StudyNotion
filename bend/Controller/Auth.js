const bcrypt=require('bcrypt')
const User=require('../model/userModel')
const jwt=require('jsonwebtoken')
const otpGenerator=require('otp-generator')
const OTP = require('../model/OTPModel')
const Profile=require('../model/ProfileModel')
const mailSender = require('../utils/mailSender')
const {passwordUpdated}=require('../mail/templates/PasswordUpdate')
require('dotenv').config()


//Send OTP For Email Verification
exports.sendotp=async(req,res)=>{
    try{
        //fetch email from request ki body
        const {email}=req.body

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent=await User.findOne({email})

        // to be used in case of signup

        // If user found with provided email
        if(checkUserPresent){
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success:false,
                message:"User is Already Registered",
            })
        }

        //generate otp
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        //check unique otp or not
        const result=await OTP.findOne({otp:otp})
   
        while (result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            })
        }
        const otpPayload={email,otp}
        if(otpPayload){
            const otpBody= await OTP.create(otpPayload)
            console.log("OTP Body",otpBody)
        }else{
            console.log("Error storing OTP:")
        }
    
        res.status(200).json({
            success:true,
            message:`OTP Sent Successfully`,
            otp,
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Error in otp sending",
            error:error.message
        })
    }
}
//Signup Controller for Registering Users
exports.signup=async(req,res)=>{
    try{
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        }=req.body

        // Check if All Details are there or not
        if(
            !firstName ||
            !lastName || 
            !email || 
            !password || 
            !confirmPassword || 
            !accountType ||  
            !otp
        ){
            return res.status(403).send({
                success:false,
                message:"All Fields are required",
            })
        }

        // Check if password and confirm password match
        if( password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match. Please try again.",
            })
        }

        // Check if user already exists
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists. Please sign in to continue.",
            })
        }

        // Find the most recent OTP for the email
        const response=await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log(response)
        if(!response.length){
            // OTP not found for the email
            return res.status(400).json({
                success:false,
                message:"The OTP is not valid",
            })
        }else if(otp !==response[0].otp){
            return res.status(400).json({
                 // Invalid OTP
                success:false,
                message:"The OTP is not valid",
            })
        }

         // Hash the password
        const hashedPassword=await bcrypt.hash(password,10)

         // Create the user
        let approved="";
        approved=== "Instructor" ? (approved=false):(approved=true)

        // Create the Additional Profile For User
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,

        })

        const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        return res.status(200).json({
            success:true,
            user,
            message:"User registered successfully"
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again."
        })
    }
}

//Login controller for authenticating users
exports.login=async(req,res)=>{
    try{

        // Get email and password from request body
        const {email,password}=req.body

        // Get email and password from request body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill up All the Required Fields",
            })
        }

        // Find user with provided email
        const user=await User.findOne({email}).populate("additionalDetails")

        // If user not found with provided email
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please SignUp to Continue",

            })
        }

        // Generate JWT token and Compare Password
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign(
                {email:user.email,id:user._id,accountType:user.accountType},
                "fsd",
                {
                    expiresIn:"2h",
                }
            )

            // Save token to user document in database
            user.toObject();
            user.token = token;
            user.password = undefined;


            // Set cookie for token and return success response
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User Login Successfully",
                token,
                user,
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Login Failures Please Try Again',
        })
    }
}

//changePassword
exports.changePassword=async(req,res)=>{
    try{
        // Get user data from req.user
        const userDetails=await User.findById(req.user.id)

        // Get old password, new password, and confirm new password from req.body
        const {oldPassword,newPassword}=req.body

        // Validate old password
        const isPasswordMatch=await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if(!isPasswordMatch){
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(404).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

        // Update password
        const encryptedPassword=await bcrypt.hash(newPassword,10)
        const updatedUserDetails=await User.findByIdAndUpdate(
            req.user.id,
            {password:encryptedPassword},
            {new:true}
        )

        // Send notification email
        try{
            const emailResponse=await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )

            console.log("Email sent successfully:", emailResponse.response);
            console.log("Email sent successfully:", emailResponse);

        }
        catch(error){
            console.error("Error occurred while sending email:",error)
            return res.status(500).json({
                success:false,
                message:"Error occurred while sending email",
                error:error.message,

            })
        }

        return res.status(200).json({ 
            success: true, 
            message: "Password updated successfully" 
        });
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Changing Password is Failed "
        })
    }
}