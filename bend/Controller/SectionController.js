const Course=require('../model/courseModel')
const Section=require('../model/SectionModel')
const SubSection=require('../model/SubsectionModel')




//Create a new section
exports.createSection=async(req,res)=>{
    try{

        // Extract the required properties from the request body
        const {sectionName,courseId}=req.body

        //Validate the input
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
              })
        }

        // Create a new section with the given name
        const newSection=await Section.create({ sectionName})

        // Add the new section to the course's content array
        //update course with section ObjectID
        const updatedCourse=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                },
            },
            {new:true}
        )
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            })
            .exec()
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        // Return the updated course object in the response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            newSection,
            updatedCourse
        })
     }catch (error) {
        // Handle errors
        console.log(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

// UPDATE a section
exports.updateSection=async(req,res)=>{
    try{

        // data input
        // const {sectionName,sectionId}=req.body
        const {sectionName,sectionId,courseId}=req.body
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        //data update
        const section=await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        )

        const updatedCourse=await Course.findById(courseId)
            .populate({
                path:'courseContent',
                populate:{
                    path:'subSection',
                }
            })
            .exec()
            console.log(updatedCourse)

        res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedCourse
        })
    }
    catch (error) {
        console.error("Error updating section:", error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}

//DELETE A section
exports.deleteSection=async(req,res)=>{
    try{


        //get ID -assuming that we are sending ID in Params
        // const {sectionId}=req.params
        //use findByIdandDelete
        // await Section.findByIdAndDelete(sectionId)
        //TODO[tesing]: do we need to delete the entry from the course schema ??
        //return response
        // return res.status(200).json({
        //     success:true,
        //     message:"Section Deleted Successfully"
        // })



        const {sectionId,courseId}=req.body

        if (!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const sectionDetails=await Section.findById(sectionId);

        //Section ke ander ke subsections delete kiye hai 
        sectionDetails.subSection.forEach(async(ssid)=>{
            await SubSection.findByIdAndDelete(ssid)
        })
        
        console.log('Subsections within the section deleted')
        //NOTE: Due to cascading deletion, Mongoose automatically triggers the built-in middleware to perform a cascading delete for all the referenced 
        //SubSection documents. DOUBTFUL!

        //From course, courseContent the section gets automatically deleted due to cascading delete feature
        await Section.findByIdAndDelete(sectionId);
        console.log('Section deleted')

        const updatedCourse=await Course.findById(courseId)
                            .populate({
                                path:'courseContent',
                                populate:{
                                    path:'subSection'
                                }
                            })

        res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse
        })
    }
    catch (error) {
        console.error("Error deleting section:", error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}