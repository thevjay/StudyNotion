import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <>
        <div className='w-full flex items-start gap-x-6'>
            <div className='flex flex-1'>
                <h1>Add Course</h1>
                <div className='flex-1'>
                    <RenderSteps/>
                </div>    
            </div>

                {/* Course Upload Tips */}
            <div>
                <p className='text-richblack-5'>⚡ Course Upload Tips</p>
                <ul className='text-xs text-richblack-5'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>
                        Add Topics in the Course Builder section to create lessons,
                        quizzes, and assignments.
                    </li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>    
            </div>   
        </div> 
    </>
  )
}

export default AddCourse
