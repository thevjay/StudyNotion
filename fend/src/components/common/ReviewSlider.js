import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';

import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

import ReactStars from 'react-rating-stars-component'

// Get apiFunction and the endpoint
import {apiConnector} from '../../services/apiconnector'
import {ratingsEndpoints} from '../../services/apis'
import { FaStar } from 'react-icons/fa6'

const ReviewSlider = () => {


      // Sample demo data (replace with actual API data when available)
      const demoReviews = [
        {
            user: {
                firstName: 'John',
                lastName: 'Doe',
                image: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            course: {
                courseName: 'React for Beginners',
            },
            review: 'This course is amazing! It helped me understand the fundamentals of React.',
            rating: 4.5,
        },
        {
            user: {
                firstName: 'Jane',
                lastName: 'Smith',
                image: 'https://randomuser.me/api/portraits/women/1.jpg',
            },
            course: {
                courseName: 'Advanced JavaScript',
            },
            review: 'Great content, very detailed and easy to follow.',
            rating: 4.7,
        },
        {
            user: {
                firstName: 'Alice',
                lastName: 'Johnson',
                image: 'https://randomuser.me/api/portraits/women/2.jpg',
            },
            course: {
                courseName: 'Web Development Bootcamp',
            },
            review: 'A comprehensive course covering all the important web development topics.',
            rating: 5.0,
        },
        {
            user: {
                firstName: 'Bob',
                lastName: 'Brown',
                image: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
            course: {
                courseName: 'Node.js Mastery',
            },
            review: 'The best Node.js course I have ever taken! Highly recommend it.',
            rating: 4.9,
        },
        {
            user: {
                firstName: 'Charlie',
                lastName: 'Davis',
                image: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
            course: {
                courseName: 'React Native for Mobile Apps',
            },
            review: 'Fantastic course, I learned so much about building apps with React Native.',
            rating: 4.8,
        },
    ]

   
    const [reviews,setReviews]=useState([])
    const truncateWords=15;

   

    useEffect(()=>{

        // api call
        // const fetchAllReviews=async()=>{
        //    const {data}= await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
        //    //console.log("Logging response in rating",response)

        //    //const {data}=response;

        //    if(data?.success){
        //     setReviews(data?.data)
        //    }

        //    console.log("Printing Reviews",reviews)
        // }

        // fetchAllReviews()
        
        setReviews(demoReviews)
        console.log(demoReviews)
        console.log("review",reviews)
    },[]);

  return (
    <div className='text-white'>
       <div className='h-[190px] max-w-maxContent'>
            <Swiper
                slidesPerView={4}
                spaceBetween={24}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay:2500,
                }}
                modules={[FreeMode,Pagination,Navigation,Autoplay]}
                className='w-full'
            >

                {
                    reviews.map((review,index)=>(
                        <SwiperSlide key={index}>
                            <img
                                src= {review?.user?.image
                                    ? review?.user?.image
                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                }
                                alt='Profile Pic'
                                className='h-9 w-9 object-cover rounded-full'
                            />

                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>

                            <h3>
                                {review.rating.toFixed(1)}
                            </h3>

                            <ReactStars
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar/>}
                                fullIcon={<FaStar/>}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
       </div>
    </div>
  )
}

export default ReviewSlider
