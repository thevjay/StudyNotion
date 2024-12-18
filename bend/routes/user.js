// Import the required modules
const express = require("express")
const { login, signup, sendotp, changePassword } = require("../Controller/Auth")
const { auth, isAdmin } = require("../Middleware/AuthMiddleware")
const { resetPasswordToken, resetPassword } = require("../Controller/resetPassword")
const { getAllStudents, getAllInstructors } = require("../Controller/profile")
const route = express.Router()

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Route for user login
route.post("/login",login)

//Route for user signup
route.post('/signup',signup)

//Route for sending OTP to the User's email
route.post('/sendotp',sendotp)

//changePassword
route.post('/changePassword',auth,changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
route.post('/reset-password-token',resetPasswordToken)


// Route for resetting user's password after verification
route.post('/reset-password',resetPassword)

// ********************************************************************************************************
//                                     Only for Admin - getAllStudents & getAllInstructors
// ********************************************************************************************************
route.get("/all-students",auth,isAdmin,getAllStudents)
route.get('/all-instructors',auth,isAdmin,getAllInstructors)
module.exports=route