import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import {MdNavigateNext} from 'react-icons/md'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'


const CourseBuilderForm = () => {

  const {token}=useSelector((state)=>state.auth)
  const {course}=useSelector((state)=>state.course)


  const {register,handleSubmit,setValue,formState:{errors}}=useForm()

  const dispatch=useDispatch()
  const [editSectionName,setEditSectionName]=useState(null)
  const [loading,setLoading]=useState(false)
  
  console.log("nested",course.courseContent.length)
  console.log("nested map",course.courseContent)


  useEffect(()=>{
    console.log("Upadeted:",course)
  },[course])

  const onSubmit=async(data)=>{
    setLoading(true)
    let result;

    if(editSectionName){
      //we are editing the section name

      result=await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id,
      },token)
    }else{
      result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token)

    }
    
    //udate values
    if(result){
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue('sectionName','')
    }
    //loading false
    setLoading(false)
  }

  const cancelEdit=()=>{
    setEditSectionName(null)
    setValue('sectionName','')
  }

  const goBack=()=>{
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext=()=>{
    if(course?.courseContent?.length===0){
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please add atleast one lecture in each section")
      return
    }
    //if everything is good
    dispatch(setStep(3))
  }


  const handleChangeEditSectionName=(sectionId,sectionName)=>{

    if(editSectionName===sectionId){
      cancelEdit()
      return;
    }
    setEditSectionName(sectionId)
    setValue('sectionName',sectionName)

  }

  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        <p className='text-richblack-5 text-2xl font-semibold'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='sectionName' className='text-sm text-richblack-5'>Section name<sup className='text-pink-200'>*</sup></label>
            <input
                id='sectionName'
                placeholder='Add Section name'
                disabled={loading}
                {...register('sectionName',{required:true})}
                className='form-style w-full'
            />
            {
              errors.sectionName &&(
                <span className='text-pink-200 ml-2 text-xs tracking-wide'>Section name is required</span>
              )
            }
          </div>

          <div className='mt-10 flex w-full'>
            <IconBtn
              type='submit'
              disabled={loading}
              text={editSectionName ? 'Edit Section Name' : 'Create Section'}
              outline={true}
            >
              <IoAddCircleOutline size={20} className='text-yellow-50'/>
            </IconBtn>
            {editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline ml-1'
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* nested view */}
        {course?.courseContent?.length > 0 &&(
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )}

      {/* Next Prev Button */}
        <div className='flex justify-end gap-x-3'>
          <button
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
          >
            Back
          </button>
          <IconBtn
            disabled={loading}
            text='Next' onclick={goToNext}
          >
            <MdNavigateNext/>
          </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm

