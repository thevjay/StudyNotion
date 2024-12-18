import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import {MdEdit} from 'react-icons/md'
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown, AiOutlinePlus } from "react-icons/ai"
import SubSectionModel from './SubSectionModel'
import ConfirmationModal from '../../../../common/ConfirmationModel'
import {setCourse} from '../../../../../slices/courseSlice'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'


const NestedView = ({handleChangeEditSectionName}) => {

    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();    

    const [addSubSection,setAddSubSection]=useState(null)
    const [viewSubSection,setViewSubSection]=useState(null)
    const [editSubSection,setEditSubSection]=useState(null)

    const [confirmationModel,setConfirmationModel]=useState(null)


    console.log("confirmationModal",confirmationModel)

    useEffect(()=>{
        console.log("Rendering it again")
    })

    const handleDeleteSection=async(sectionId)=>{
        const result=await deleteSection({sectionId,courseId:course._id},token)

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModel(null)
    }

    const handleDeleteSubSection=async(subSectionId,sectionId)=>{

        const result=await deleteSubSection({subSectionId,sectionId,token})

        if(result){
            //TODO :extra kya kar skte
            const updatedCourseContent=course.courseContent.map((section)=>
            section._id === sectionId ? result:section)
            const updatedCourse={...course,courseContent:updatedCourseContent}; 
            dispatch(setCourse(updatedCourse))
        }

        setConfirmationModel(null)

    }
  return (
    <div>
      <div className='richblack-700 rounded-lg  p-6 px-8 ' id='nestedViewContainer'>
        {course.courseContent.map((section)=>(
            //Section DropDown
            <details key={section._id} open>
                {/* Section DropDown Content */}
                <summary className='flex items-center justify-between cursor-pointer gap-x-3 border-b-2 border-b-richblack-600 py-2'>
                    <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu className='text-richblack-50 text-2xl'/>
                        <p className='text-richblack-50 font-semibold'>{section.sectionName}</p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <button
                            onClick={()=>
                                handleChangeEditSectionName(
                                    section._id,
                                    section.sectionName
                                )}
                        >
                            <MdEdit className='text-richblack-300 text-xl'/>
                        </button>
                        <button
                            onClick={()=>{
                                setConfirmationModel({
                                    text1:"Delete this section",
                                    text2:"All the lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleDeleteSection(section._id),
                                    btn2Handler:()=>setConfirmationModel(null)
                                })
                            }}
                        >
                            <RiDeleteBin6Line className='text-xl text-richblack-300' />
                        </button>
                        <span className='text-richblack-300 font-medium '>|</span>
                        <AiFillCaretDown className={`text-xl text-richblack-300`} />
                    </div>
                </summary>
                
                {/* subSection */}
                <div className='px-6 pb-4'>
                {/* Render All Sub Sections Within a Section */}
                    {
                        section?.subSection?.map((data)=>(
                                <div
                                    key={data?._id}
                                    onClick={()=>setViewSubSection(data)}
                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                >
                                    <div className='flex items-center gap-x-3 py-2'>
                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50'>{data.title}</p>
                                    </div>  
                                    <div 
                                        onClick={(e)=>e.stopPropagation()}                                    
                                        className='flex items-center gap-x-3'>
                                        <button 
                                            onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                        >
                                            <MdEdit className='text-xl text-richblack-300' />
                                        </button>
                                        <button
                                            onClick={()=>{
                                                setConfirmationModel({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () =>setConfirmationModel (null)
                                                    })
                                            }}
                                        >
                                            <RiDeleteBin6Line className='text-xl text-richblack-300' />
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    }
                   {/* Add New Lecture to Section */}
                    <button
                        onClick={()=>setAddSubSection(section._id)}
                        className='mt-2 flex items-center gap-x-1 text-yellow-50'
                    >
                        <AiOutlinePlus className='text-lg'/>
                        <p>Add Lecture</p>
                    </button>
                </div>
            </details>
        ))}
      </div>

     {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModel 
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
        />
      ):viewSubSection ? (
        <SubSectionModel
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
        />
      ):editSubSection ? (
        <SubSectionModel
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
        />
      ):(<div></div>) 
    }

    {/* Confirmation Modal */}
    {
        confirmationModel ?
        (<ConfirmationModal  modalData={confirmationModel}/>)
        :(<></>)
      }
    </div>
  )
}

export default NestedView
