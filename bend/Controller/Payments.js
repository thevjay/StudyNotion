const {instance}=require('../config/razorpay')
const Course=require('../model/courseModel')
const User=require('../model/userModel')
const mailSender=require('../utils/mailSender')
const {courseEnrollmentEmail}=require('../mail/templates/courseEnrollmentEmail')
const CourseProgress=require('../model/CourseProgressModel')
const  mongoose = require('mongoose')
const crypto=require('crypto')
const { paymentSuccessEmail } = require('./../mail/templates/paymentSuccessEmail')


//initiate the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId =  req.user.id;

    if (courses.length === 0) {
        return res.json({
            success:false,
            message:"Please Provide course IDs"
        })
    }

    let totalAmount = 0;

    for (const course of courses){

        const courseId=typeof course === 'string' ? course : course.courseId
        //console.log("CourseId number",courseId)

        try {
            
           const courseData = await Course.findById(courseId);
            if(!courseData){
                return res.status(200).json({
                    success:false,
                    message:"Course doesn't exist"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(courseData.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"User already registered"
                })
            }

            totalAmount += parseInt(courseData.price);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    
    //console.log("The amount in capturePayment is", totalAmount)
    const currency = "INR"
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success:true,
            message: paymentResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false, 
            mesage:"Could not Initiate Order"
        });
    }
}


//verify the payment  Signature
exports.verifyPayment=async(req,res)=>{
    //console.log("request in verifyPayment is", req)
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({
                success:false, 
                message:"Payment Failed"
        });
    }


    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature=crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if(expectedSignature === razorpay_signature){
        //enroll karwaro student ko
        await enrollStudents(courses,userId,res);
        //return res
        await res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    
    return res.status(500).json({
        success:false,
        message:"Payment Failed"
    })
}


// Enroll Students after Payment
const enrollStudents=async(courses,userId,res)=>{
    
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide course and userId"
        });
    }

    for(const courseId of courses){
        try{
            //find the course and eroll the student in it
            const updatedCourse=await Course.findByIdAndUpdate(courseId,
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },{new:true}
            )

            if(!updatedCourse){
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            //courseProgress
            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos: [],
            })

            //find the student and add the course to their list of enrolledCourses
            const updatedStudent=await User.findByIdAndUpdate(userId,
                {
                    $push:{
                        courses:courseId,
                        courseProgress: courseProgress._id,
                    }
                },{new:true}
            )

            //bachhe ho mail send kardo
            const emailResponse = await mailSender(
                updatedStudent.email,
                `Successfully Enrolled into ${updatedCourse.courseName}`,
                courseEnrollmentEmail(updatedCourse.courseName, `${updatedStudent.firstName}`)
            )

            //console.log("Email Sent Successfully",emailResponse.response)
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false, 
                message:error.message
            });
        }
    }
}


exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body;

    const userId=req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide all the fields"
        })
    }

    try{
        //student ko dhundo
        const user=await User.findById(userId)
        await mailSender(
            user.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${user.firstName}`),
            amount/100,orderId,paymentId
        )
    }
    catch(error){
        console.error("error in sending mail",error)
        return res.status(500).json({
            success:false,
            message:"Could not send email"+error
        })
    }
}


//Capture the payment and initiate the Razorpay order
// exports.capturePayment=async(req,res)=>{

//         //get courseId and UserID
//         const {course_id}=req.body
//         const userId=req.user.id
//         //validation
//         //valid courseID
//         if(!course_id){
//             return res.json({
//                 success:false,
//                 message:"Please provide valid course ID",
//             })
//         }
//         //valid courseDetail
//         let course
//         try{
//             course=await Course.findById(course_id);
//             if(!course){
//                 return res.json({
//                     success:false,
//                     message:"Could not find the course",
//                 })
//             }
//             //user already pay for the same course
//             const uid=new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled"
//                 })
//             }

//         }
//         catch(error){
//             console.log(error)
//             return res.status(500).json({
//                 success:false,
//                 error:error.message
//             });
//         }

//         //order create
//         const amount=course.price;
//         const currency='INR'

//         const options={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId
//             }
//         }

//         try{
//             //initiate the payment using razorpay
//             const paymentResponse=await instance.orders.create(options)
//             console.log(paymentResponse)
//             //return response
//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             })
//         }
//         catch(error){
//             console.log(error)
//             res.json({
//                 success:false,
//                 message:"Could not initiate order"
//             })
//         }
// }

// //verify Signature of Razorpay and server

// exports.verifySignature=async(req,res)=>{
//     const webhookSecret='12345678';

//     const signature=req.Headers['x-razorpay-signature'];

//     const shasum=crypto.createHmac("sha256",webhookSecret)
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest('hex')

//     if(signature === digest){
//         console.log("Payment is authorized")


//         const {courseId,userId}=req.body.payload.payment.entity.notes

//         try{
//                 //fulfill the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse=await Course.findByIdAndUpdate(
//                                                         {_id:courseId},
//                                                         {$push:{studentsEnroled:userId}},
//                                                         {new:true}
//                 );

//                 if(!enrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not Found"
//                     })
//                 }

//                 console.log(enrolledCourse)

//                 //find the student and add the course to their list enrolled courses me
//                 const enrolledStudent=await User.findOneAndUpdate(
//                                                         {_id:userId},
//                                                         {$push:{courses:courseId}},
//                                                         {new:true},
//                 )

//                 console.log(enrolledStudent)


//                 //email send karna confirmation wala
//                 const emailResponse=await mailSender(
//                                     enrolledStudent.email,
//                                     "Congratulation from codehelp",
//                                     "Congratulation, you are onboarded into new CodeHelp Course",

//                 )

//                 console.log(emailResponse)
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and Course Added",
//                 })
//         }
//         catch(error){   
//             console.log(error)
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }

//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request"
//         })
//     }
// }



