import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

const PublishCourse= () => {


  const {register,handleSubmit,setValue,getValues}=useForm()
  const {course}=useSelector((state)=>state.course)
  const dispatch=useDispatch()
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false)


  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  })

  const goBack=()=>{
    dispatch(setStep(2))
  }


  const goToCourses=()=>{
    dispatch(resetCourseState())
    //navigate("Dashboard/my-courses");
  }

  const handleCoursePublish= async()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues('public')=== true  ||
      (course.status === COURSE_STATUS.DRAFT && getValues('public')=== false)
    ){
      //no updation in form
      //no need to make api call

      goToCourses();
      return;
    }

    //if form is updated
    const formData=new FormData()
    formData.append("courseId",course._id);

    const courseStatus=getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('status',courseStatus)

    setLoading(true)
    const result=await editCourseDetails(formData,token);

    if(result){
      goToCourses();
    }

    setLoading(false)
  }
  
  const onSubmit=()=>{
      handleCoursePublish();
  }


  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Course
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* checkbox */}
          <div className='my-6 mb-8'>
              <label htmlFor='public'  className="inline-flex items-center text-lg">
                <input
                   type='checkbox'
                   id='public'
                    {...register("public")}
                    className=' border-pure-greys-300 rounded h-4 w-3 bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
                />
                <span className='ml-3'>
                  Make this Course as Public
                </span>
              </label>
          </div>

          <div className='flex justify-end gap-4'>
              <button
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center rounded-md bg-richblack-300 p-3'

              >
                Back
              </button>
              <IconBtn disabled={loading} text='Save changes' />
          </div>
      </form>
    </div>
  )
}

export default PublishCourse;
