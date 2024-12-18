import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeLine=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo3,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo4,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    }
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-14 items-center '>
        {/* Left Part */}
        <div className='lg:w-[45%] flex flex-col gap-5'>
            {
                timeLine.map((ele,index)=>{
                    return(
                        <div className='flex flex-row gap-6 ' key={index}>
                            <div className='flex  gap-6'>
                            <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]'>
                                <img src={ele.Logo} />
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{ele.heading}</h2>
                                <p className='text-base'>{ele.Description}</p>
                            </div>
                            </div>
                            <div className={` ${index === 3 ? "hidden":""}   h-14 
                            border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>

                            </div>
                        </div>
                    )
                })
            }
        </div>

        {/* Right Part */}
        <div className='relative shadow-blue-200'>

            <img src={timelineImage} 
                alt='timelineimage'
                className='shadow-white object-cover h-fit'
            />

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10
                left-[50%] translate-x-[-50%] translate-y-[-50%]
            '>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='flex gap-7 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>type of courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
