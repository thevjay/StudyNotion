//Import the required modules
const express=require('express')
const { createCourse, editCourse, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails } = require('../Controller/CourseController')
const {auth,isInstructor, isAdmin, isStudent}=require('../Middleware/AuthMiddleware')
const { createCategory, showAllCategories, categoryPageDetails} = require('../Controller/Category')
const { createSection, updateSection, deleteSection } = require('../Controller/SectionController')
const { createSubSection, updateSubSection, deleteSubSection } = require('../Controller/SubsectionController')

const {updateCourseProgress}=require('../Controller/courseProgress')

// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating
}=require('../Controller/RatingAndReviewController')
const route=express.Router()



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
route.post('/createCourse',auth,isInstructor,createCourse)
// Edit Course routes
route.post('/editCourse',auth,isInstructor,editCourse)

// Get Details for a Specific Courses
route.post('/getFullCourseDetails',auth,getFullCourseDetails)
//get Details for a specific Courses
route.post('/getCourseDetails',getCourseDetails)

//Add a Section to a Course
route.post('/addSection',auth,isInstructor,createSection)
// Update a Section
route.post('/updateSection',auth,isInstructor,updateSection)
//Delete a section
route.post('/deleteSection',auth,isInstructor,deleteSection)
// Add a Sub Section to a Section
route.post('/addSubSection',auth,isInstructor,createSubSection)
// Edit Sub Section
route.post('/updateSubSection',auth,isInstructor,updateSubSection)
// Delete Sub Section
route.post('/deleteSubSection',auth,isInstructor,deleteSubSection)



//Delete a Course
route.delete('/deleteCourse',deleteCourse)

route.post('/updateCourseProgress',auth,isStudent,updateCourseProgress)







//Get all Courses Under a Specific Instructor
route.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses)








// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
route.post('/createCategory',auth,isAdmin,createCategory)
route.get('/showAllCategories',showAllCategories)
// router.delete('/deleteCategory', auth, isAdmin, deleteCategory);
route.post('/getCategoryPageDetails',categoryPageDetails)




// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
route.post('/createRating',auth,isStudent,createRating)
route.get('/getAverageRating',getAverageRating)
route.get('/getReviews',getAllRating)

module.exports=route

25