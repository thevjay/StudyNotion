// Import the required modules
const express = require("express")
const { auth, isStudent } = require("../Middleware/AuthMiddleware")
const {capturePayment, verifyPayment, sendPaymentSuccessEmail}=require('../Controller/Payments')
const route = express.Router()



route.post('/capturePayment',auth,isStudent,capturePayment)
route.post('/verifyPayment',auth,isStudent,verifyPayment)
route.post('/sendPaymentSuccessEmail',auth,isStudent,sendPaymentSuccessEmail)

module.exports=route