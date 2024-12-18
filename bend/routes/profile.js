const express=require('express')
const { updateProfile, getAllUserDetails,updateDisplayPicture, deleteAccount, getEnrolledCourses, instructorDashboard } = require('../Controller/profile')

const {auth, isStudent, isInstructor} =require('../Middleware/AuthMiddleware')
const route=express.Router()




// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
route.put('/updateProfile',auth,updateProfile)
route.get('/getUserDetails',auth,getAllUserDetails)
route.delete('/deleteProfile',auth,deleteAccount)


//Get Enrolled Course
route.get('/getEnrolledCourses',auth,getEnrolledCourses)
route.get('/instructorDashboard',auth,isInstructor,instructorDashboard)
route.put('/updateDisplayPicture',auth,updateDisplayPicture)

module.exports=route