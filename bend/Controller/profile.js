const User=require('../model/userModel')
const Profile=require("../model/ProfileModel")

const Course=require('../model/courseModel')
const CourseProgress=require('../model/CourseProgressModel')

const {uploadImageToCloudinary}=require('../utils/imageUploader')
const {convertSecondsToDuration}=require('../utils/secToDuration')


//Method for updating a profile
exports.updateProfile=async(req,res)=>{
    try{

        //get data
        const {
            dateOfBirth='',
            about='',
            contactNumber,
            gender,
        }=req.body

        //get user data
        const userId=req.user.id
        //validation
        if(!contactNumber || !gender ) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        } 

        //Find the Profile by id
        const userDetails=await User.findById(userId)
        const profileId=userDetails.additionalDetails;


        const updatedProfile=await Profile.findByIdAndUpdate(profileId,{
            dateOfBirth,
            gender,
            about,
            contactNumber
        },{new:true})

        //Find the updated user details
        const updatedUserDetails=await User.findById(userId)
            .populate("additionalDetails")
            .exec()

        return res.json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        })

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

//delete Account
//Explore --> how can we schedule this deletion operation
exports.deleteAccount=async(req,res)=>{
    try{

        //get id
        const id=req.user.id
        //validation
        const userDetails=await User.findById(id)
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //delete profile id
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})

        //delete user
        await User.findByIdAndDelete({_id:id})

        //TODO: HW unenroll user from all enrolled courses
        //return response
        res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete User',
            error: error.message,
        })
    }
}

//getalluserDetails
exports.getAllUserDetails=async(req,res)=>{
    try{
        //get Id
        const id=req.user.id
        //validate and get user Details
        const userDetails=await User.findById(id)
            .populate("additionalDetails")
            .exec()
        
        console.log(userDetails)

        res.status(200).json({
            success:true,
            message:"User Data fetched successfully",
            userDetails,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to All user Details",
            error:error.message
        })
    }
}


exports.updateDisplayPicture=async(req,res)=>{
    try{
        // Access the uploaded file


        const displayPicture=req.files?.displayPicture // Check what is received

        console.log(displayPicture)
        // Check if the file exists
        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded or file is invalid.',
            });
        }
        
        const userId=req.user.id

        const image=await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)

        const updatedProfile=await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
        },
      })
      .exec()

      userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.complectedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
        console.error(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

//instructorDashboard
exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({
        courses:courseData
    });

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}

// ================ get All Students ================
exports.getAllStudents = async (req, res) => {
    try {
        const allStudentsDetails = await User.find({
            accountType: 'Student'
        })
            .populate('additionalDetails')
            .populate('courses')
            .sort({ createdAt: -1 });


        const studentsCount = await User.countDocuments({
            accountType: 'Student'
        });


        res.status(200).json(
            {
                allStudentsDetails,
                studentsCount,
                message: 'All Students Data fetched successfully'
            },
        )
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error while fetching all students',
            error: error.message
        })
    }
}

// ================ get All Instructors ================
exports.getAllInstructors = async(req,res)=>{
    try{

        const allInstructorsDetails = await User.find({
                                    accountType:"Instructor"
                                })
                                    .populate('additionalDetails')
                                    .populate('courses')
                                    .sort({createdAt:-1})

        const instructorsCount=await User.countDocuments({
            accountType:"Intructor"
        })

        res.status(200).json(
            {
                allInstructorsDetails,
                instructorsCount,
                message: 'All Instructors Data fetched successfully'
            }
        )
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Error while fetching all Instructors',
            error: error.message
        }) 
    }
}