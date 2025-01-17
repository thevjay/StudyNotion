import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus]=useState("")

    const [videobarActive,setVideobarActive]=useState('')
    const navigate=useNavigate();
    const location=useLocation()
    const {sectionId,subSectionId}=useParams();
   
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        const setActiveFlags=()=>{ 
            if(!courseSectionData.length)
                return;
            const currentSectionIndex=courseSectionData.findIndex(
                (data)=>data._id === sectionId
            )

            const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.
                        findIndex(
                            (data)=>data._id === subSectionId
                        )

            const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.
                        [currentSubSectionIndex]?._id;

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideobarActive(activeSubSectionId)
        }
        setActiveFlags()
    },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div>
      <div>
        {/* for button and handings */}
        <div>
            {/* for buttons */}
            <div>
                <div
                    onClick={()=>navigate('/dashboard/enrolled-courses')}
                >
                    Back
                </div>

                <div>
                    <IconBtn 
                        text={'Add Review'}
                        onclick={()=>setReviewModal(true)}
                    />
                </div>

            </div>
            {/* for heading or title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length}/{totalNoOfLectures}</p>
            </div>
        </div>

        {/* for sections and subSections */}
        <div>
            {
                courseSectionData.map((section,index)=>(
                    <div
                        onClick={()=>setActiveStatus(section?._id)}
                        key={index}
                    >   

                        {/* section */}
                        <div>
                            <div>
                                {section?.sectionName}
                            </div>
                            {/* HW - add arrow icon here and handle rotate logic */}

                        </div>

                        {/* subSection */}

                        <div>
                            {
                                activeStatus === section?._id && (
                                    <div>
                                        {
                                            section.subSection.map((topic,index)=>(
                                                <div
                                                    className={`flex gap-5 p-5 
                                                        ${videobarActive === topic._id 
                                                            ? 'bg-yellow-200 text-richblack-900'
                                                            : 'bg-richblack-900 text-white'
                                                            }
                                                        `}
                                                    key={index}
                                                    onClick={()=>{navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                
                                                    setVideobarActive(topic?._id)
                                                    }}
                                                    
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked={completedLectures.includes(topic?._id)}
                                                        onChange={()=>{}}
                                                    />
                                                    <span>
                                                        {topic.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default VideoDetailsSidebar
