import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

  

  const {token}=useSelector((state)=> state.auth)
  const navigate=useNavigate()
  const [enrolledCourses,setEnrolledCourses]=useState(null)

  const getEnrolledCourses=async()=>{
    try{

      const response=await getUserEnrolledCourses(token);
      setEnrolledCourses(response)
    }
    catch(error){
      console.log("Unable to Fetch Enrolled Courses")
    }
  }

  useEffect(()=>{
    getEnrolledCourses()
  },[])


  return (
    <div>
      <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className='grid h-[10vh] w-full place-content-center text-richblack-5'>
          <div className='spinner'></div>
        </div>
      ): !enrolledCourses.length ?(
        <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
                  You have not enrolled in any course yet.
        </p>
      ):(
        <div className='my-8 text-richblack-5'>
            {/* Headings */}
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>

            {/* Course Names */}
            {enrolledCourses.map((course,i,arr)=>(
              <div
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img src={course.thumbnail}
                    alt=''
                    className='h-14 w-14 rounded-lg object-cover'
                  />
                  <div>
                    <p>{course.courseName}</p>
                    <p>
                      {
                        course.description.length>50 
                        ? `${course.description.slice(0,50)}...`
                        : course.description
                      }
                    </p>
                  </div>
                </div>

                <div>{course?.totalDuration}</div>
                <div>
                  <p>Progress:{course.progressPercentage || 0}</p>
                  <ProgressBar
                      completed={course.progressPercentage || 0}
                      height='8px'
                      isLabelVisible={false}
                  />

                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses;
