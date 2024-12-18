import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'

const RenderSteps = () => {

    const {step}=useSelector((state)=>state.course)

    const steps = [ 
        {
            id:1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ]

  return (
    <>
      <div className='flex'>
        {steps.map((item)=>(
            <>
                {/* Step Circle */}
                <div className='flex flex-col items-center' key={item.id}>
                    <button
                        className={`cursor-pointer aspect-square w-[34px]
                            place-items-center rounded-full  border-[1px]
                            ${step===item.id ? 'border-yellow-50 bg-richblack-900 text-yellow-50'
                                :'border-richblack-700 bg-richblack-800 text-richblack-300'
                            }
                            ${step> item.id ? 'bg-yellow-50' :'text-yellow-50'}
                            `}
                    >
                        {
                            step>item.id?(
                                <FaCheck className='font-bold text-richblack-900'/>
                            ):(
                                item.id
                            )
                        }
                    </button>
                </div>

                {/* Dotted Line */}
                {item.id !== steps.length &&(
                    <>
                        <div key={item.id}
                            className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                            ${step >item.id ? 'border-yellow-50':"border-richblack-500"}    
                            `}
                        >
                            
                        </div>
                    </>
                )}
            </>
        ))}
      </div>


      {/* Steps titles */}
      <div className='flex mb-16 w-full select-none justify-between'>
            {steps.map((item)=>(
                <>
                    <div className='flex min-w-[130px] flex-col items-center gap-y-2'>
                        <p className='text-richblack-50'>{item.title}</p>
                    </div>
                </>
            ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/> }
      {step=== 3 && <PublishCourse/>} 
    </>
  )
}

export default RenderSteps
