const CourseProgress=require('../model/CourseProgressModel')
const SubSection=require('../model/SubsectionModel')


exports.updateCourseProgress=async(req,res)=>{

    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;;

    try{
        //check if the subsection is valid
        const subSection=await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                error:"Invalid SubSection"
            })
        }

        //check for old entry
        let courseProgress=await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        })

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }
        else{
            //check for re-completing video/subsection
            if(courseProgress.complectedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection already completed"
                })
            }

            //push into completed video
            courseProgress.complectedVideos.push(subSectionId)
        }
        await courseProgress.save();
        console.log("Course Progress Save call Done");

        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            error:"Internal Server Error"
        })
    }
}