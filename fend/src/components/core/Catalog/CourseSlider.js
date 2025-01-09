import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';

import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

import CourseCard from './CourseCard'

const demoCourses = [
    {
        _id: '1',
        courseName: 'Master React for Beginners',
        price: '$29.99',
        instructor: {
            firstName: 'John',
            lastName: 'Doe'
        },
        thumbnail: 'https://a.storyblok.com/f/172362/1920x1080/a5e68043d9/react-logo-with-react-for-beginners-text.jpg',
        ratingAndReviews: [
            { rating: 5, review: 'Great course!' },
            { rating: 4, review: 'Very informative.' },
            { rating: 3, review: 'Good, but could use more examples.' },
        ]
    },
    {
        _id: '2',
        courseName: 'JavaScript Essentials',
        price: '$39.99',
        instructor: {
            firstName: 'Jane',
            lastName: 'Smith'
        },
        thumbnail: 'https://th.bing.com/th/id/OIP.ZZaV8f0-sI1l6dcdApuE6gHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        ratingAndReviews: [
            { rating: 5, review: 'Clear and concise.' },
            { rating: 5, review: 'Love the examples.' },
        ]
    },
    {
        _id: '3',
        courseName: 'Advanced CSS Techniques',
        price: '$49.99',
        instructor: {
            firstName: 'Sarah',
            lastName: 'Johnson'
        },
        thumbnail: 'https://th.bing.com/th/id/R.142685f7e17b2059653f7c77d7648711?rik=lXR2vp5Y%2bab89w&riu=http%3a%2f%2ftoplogos.ru%2fimages%2flogo-css3.png&ehk=vC4uf%2bdx4FQMgjqnMj1ldrWsW7Au4ahlb9ibTotreCo%3d&risl=&pid=ImgRaw&r=0',
        ratingAndReviews: [
            { rating: 4, review: 'Very useful for advanced learners.' },
            { rating: 4, review: 'Good deep dive into CSS.' },
            { rating: 5, review: 'Best CSS course ever!' },
        ]
    },
    {
        _id: '4',
        courseName: 'Node.js for Backend Development',
        price: '$59.99',
        instructor: {
            firstName: 'Alex',
            lastName: 'Lee'
        },
        thumbnail: 'https://th.bing.com/th/id/R.f7337d339216d05c1551688efb13a830?rik=m28qY9WE3BaKXQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fnodejs-png-nodejs-icon-png-50-px-1600.png&ehk=XR9ktXGvw5svYVTEqemL7wSEUZL%2bihqTpYBLPSQn8GQ%3d&risl=&pid=ImgRaw&r=0',
        ratingAndReviews: [
            { rating: 5, review: 'Excellent course for beginners.' },
            { rating: 4, review: 'The explanations were a bit fast.' },
        ]
    },
    {
        _id: '5',
        courseName: 'Full Stack Development Bootcamp',
        price: '$99.99',
        instructor: {
            firstName: 'Emily',
            lastName: 'Clark'
        },
        thumbnail: 'https://th.bing.com/th/id/OIP._QzaZdzOqACIsIfV9IrrCwHaDv?rs=1&pid=ImgDetMain',
        ratingAndReviews: [
            { rating: 5, review: 'Amazing course! Learned so much.' },
            { rating: 5, review: 'Highly recommend this to everyone.' },
        ]
    },
    {
        _id: '6',
        courseName: 'UX/UI Design Fundamentals',
        price: '$34.99',
        instructor: {
            firstName: 'Chris',
            lastName: 'Martinez'
        },
        thumbnail: 'https://th.bing.com/th/id/OIP.4AMioc00goUT0UzZZKOEfgHaDm?rs=1&pid=ImgDetMain',
        ratingAndReviews: [
            { rating: 4, review: 'Great intro to UX/UI design.' },
            { rating: 5, review: 'I learned a lot about design principles.' },
        ]
    },
    {
        _id: '7',
        courseName: 'Python for Data Science',
        price: '$69.99',
        instructor: {
            firstName: 'Mia',
            lastName: 'Brown'
        },
        thumbnail: 'https://i.morioh.com/3618b64471.png',
        ratingAndReviews: [
            { rating: 4, review: 'Good course for beginners.' },
            { rating: 5, review: 'I gained a lot of practical knowledge.' },
        ]
    },
    {
        _id: '8',
        courseName: 'Machine Learning with TensorFlow',
        price: '$79.99',
        instructor: {
            firstName: 'David',
            lastName: 'Davis'
        },
        thumbnail: 'https://www.nxp.com/assets/images/en/logos-external/TensorFlow-Logo-ML.png',
        ratingAndReviews: [
            { rating: 5, review: 'Amazing! Very in-depth.' },
            { rating: 5, review: 'The best ML course out there!' },
            { rating: 4, review: 'Could use a bit more explanation on some topics.' },
        ]
    },
    {
        _id: '9',
        courseName: 'Django Web Framework',
        price: '$49.99',
        instructor: {
            firstName: 'Rachel',
            lastName: 'Garcia'
        },
        thumbnail: 'https://download.logo.wine/logo/Django_(web_framework)/Django_(web_framework)-Logo.wine.png',
        ratingAndReviews: [
            { rating: 5, review: 'Perfect for those learning Django.' },
            { rating: 4, review: 'A bit slow-paced but good overall.' },
        ]
    },
    {
        _id: '10',
        courseName: 'Digital Marketing Mastery',
        price: '$59.99',
        instructor: {
            firstName: 'Mark',
            lastName: 'Wilson'
        },
        thumbnail: 'https://courses.digitalpushkraj.com/wp-content/uploads/2023/03/Digital-Marketing-Mastery.png',
        ratingAndReviews: [
            { rating: 4, review: 'A great course for digital marketing basics.' },
            { rating: 5, review: 'Very well-structured.' },
            { rating: 4, review: 'Could use more real-world examples.' },
        ]
    },
];



const CourseSlider = ({Courses}) => {

    //console.log("Course Slider",Courses)
    
    //console.log("courses slider",Courses?.length)
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={25}
                    navigation={true}
                    modules={[FreeMode,Pagination,Navigation]}
                    breakpoints={{
                        1024:{
                            slidesPerView:3
                        },
                    }}
                    className='max-h-[30rem] mySwiper'
                >
                    {
                        Courses?.map((course,index)=>(
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ):(
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={25}
                    navigation={true}
                    modules={[FreeMode,Pagination,Navigation]}
                    breakpoints={{
                        1024:{
                            slidesPerView:3
                        },
                    }}
                    className='max-h-[30rem] mySwiper'
                >
                    {
                        demoCourses?.map((course,index)=>(
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            )
        }
    </>
  )
}

export default CourseSlider
