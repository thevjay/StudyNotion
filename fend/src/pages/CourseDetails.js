import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import {fetchCourseDetails} from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import Error from './PageNotFound'
import ConfirmationModal from '../components/common/ConfirmationModel'
import RatingStars from '../components/common/RatingStars'
import {formatDate} from '../services/formatDate'
import toast from 'react-hot-toast'
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';

import { MdOutlineArrowForwardIos } from 'react-icons/md';

import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import { BiVideo } from 'react-icons/bi'
import '../App.css'
import Footer from '../components/common/Footer'

const CourseDetails = () => {

    const {user} =useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)

    const {loading}=useSelector((state)=>state.profile)
    const {paymentLoading}=useSelector((state)=>state.course)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {courseId}=useParams()


    const [courseData,setCourseData]=useState(null);
   
  
    const [confirmationModal,setConfirmationModal]=useState(null)

    useEffect(()=>{
      const getCourseFullDetails=async()=>{
        try{
          const result=await fetchCourseDetails(courseId)
          
          setCourseData(result)
        }catch(error){
          toast.error("Could not get course")
          console.log("Could not fetch courses details")
        }
      }
      getCourseFullDetails()
    },[courseId])


    const [avgReviewCount,setAvgReviewCount]=useState(0)
    useEffect(()=>{
      const count=GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews)
      setAvgReviewCount(count)
    },[courseData])

    const [totalNoOfLectures,setTotalNoOfLectures]=useState(0)

    useEffect(()=>{
      let lectures=0;
      courseData?.data?.CourseDetails?.courseContent?.forEach((sec)=>{
          lectures +=sec.subSection.length || 0
      })
      setTotalNoOfLectures(lectures)
    })


    const [isActive,setIsActive]=useState(Array(0))
    const handleActive=(id)=>{
        setIsActive(
          !isActive.includes(id) 
          ? isActive.concat(id)
          : isActive.filter((e)=> e !== id)
        )
    }
  
// TO Update
    const handleBuyCourse=()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch)
            return
        }
        else{
          setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null)
          })
        }

    }


    if(loading || !courseData){
      return(
        <div>
          Loading....
        </div>
      )
    }

    if(!courseData.success){
      return (
        <div>
          <Error/>
        </div>
      )
    }

      

    const {
      _id:course_id,
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      courseContent,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      createdAt
    }=courseData?.data?.courseDetails;

  

  return (
      // Details and Course Buy Card
    <div className='relative w-full bg-richblack-800'>
        <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
          <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>

            <div className='relative block max-h-[30rem] lg:hidden'>
              <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
              <img src={thumbnail} className='aspect-auto w-full' />
            </div>

            <div className='z-30 my-5  py-5 flex flex-col justify-center gap-4 text-lg text-richblack-5'>
              <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseName}</p>
              <p className='text-richblack-200'>{courseDescription}</p>

              <div>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
              </div>

              <div>
                <p>Created By {`${instructor.firstName}`}</p>
              </div>

              <div className='flex flex-wrap gap-5 text-lg'>
                <p className='flex items-center gap-2'>
                  <i className='text-white'>
                    <IoIosInformationCircleOutline/>
                  </i>
                  Created At {formatDate(createdAt)}
                </p>
                <p className='flex items-center gap-2'>
                  <BsGlobe/>
                  {" "} English
                </p>
              </div>
            </div>

            <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
              <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                Rs. {price}
              </p>

              <button className='yellowButton'>Buy Now</button>
              <button className='blackButton'>Add to Cart</button>
            </div>
            
          </div>

          <div className='right-[1rem] top-[10px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 lg:absolute lg:block'>
              <CourseDetailsCard
                course={courseData?.data?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
          </div>
          <div>

          </div>

          {/* What will you learn, Course Content, Sections dropdown, Author */}

          <div className='text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                <div className='my-8 border border-richblack-700'>
                  <p className='text-3xl font-semibold'>What You WIll Learn</p>
                  <div className='mt-5'>
                    {whatYouWillLearn}
                  </div>
                </div>

                <div>
                  <div>
                    <p>Course Content:</p>

                    <div>
                      <div>
                        <span>{courseContent.length} section(s)</span>

                        <span>
                            {totalNoOfLectures} Lectures
                        </span>

                        <span>
                          {courseData.data?.totalDuration} total length
                        </span>
                      </div>

                      <div>
                        <button 
                          className='text-yellow-25'
                          onClick={()=>setIsActive([])}
                        >
                          Collapse all Section
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className='py-4'>
                      {
                        courseContent.map((section)=>(
                          <div key={section._id} className='border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0'>
                            {/* section */}
                            <div onClick={()=>handleActive(section._id)}>
                              <div className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]'>
                                <div className='flex items-center gap-2'>
                                  {isActive.includes(section._id) ? (<i className='-rotate-90'><MdOutlineArrowForwardIos/></i>) :(<i className='-rotate-90'><MdOutlineArrowForwardIos/></i>)}
                                  <p>{section.sectionName}</p>
                                </div>

                                <div className='space-x-4'>
                                  <span className='text-yellow-25'>{`${section.subSection.length} lecture(s)`}</span>
                                </div>
                              </div>
                            </div>

                            {/* subSection */}
                            <div className={`${isActive.includes(section._id) ? 'h-[88px]':''} relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}>
                              {
                                section.subSection.map((subSection)=>(
                                  <div key={subSection._id} className='text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                                      <div className='py-2 flex justify-start items-center gap-2'>
                                        <span>
                                          <BiVideo/>
                                        </span>
                                        <p>
                                          {subSection.title}
                                        </p>
                                      </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        ))
                      }
                  </div>

                  {/* author */}
                  <div className='mb-14 py-4'>
                    <p className='text-[28px] font-semibold'>Author</p>
                    <div className='flex items-center gap-4 py-4'>
                       <img src={instructor.image} className='h-14 w-14 rounded-full object-cover'/>
                       <p className='text-lg'>{instructor.firstName} {instructor.lastName}</p>
                    </div>
                    <p className='text-lg'>
                      {instructor.additionalDetails.about}
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
      
        <Footer/>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
