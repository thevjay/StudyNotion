import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import '../components/core/HomePage/Border.css'
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex max-w-maxContent flex-col w-11/12 items-center text-white justify-between'>
            {/* Top Button */}
            <Link to={'/signup'}>

                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                    transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900
                    '>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your Future with
                <HighlightText text={'Coding Skills'}/>
            </div>
            {/* intro */}
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton  active={true} linkto={'/signup'}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-blue-200 mt-12 shadow-[10px_-5px_50px_-5px]'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                    muted
                    loop
                    autoPlay
                >
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* codeblock 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold '>
                            Unlock your
                            <HighlightText text={'coding potential'}/>
                            {"  "}
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"try it yourself",
                            linkto:'/signup',
                            active:true
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"learn more",
                            linkto:'/login',
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codeColor={"text-yellow-25"}
                />
            </div>


            {/* codeblock 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold '>
                            Unlock your
                            <HighlightText text={'coding potential'}/>
                            {"  "}
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"try it yourself",
                            linkto:'/signup',
                            active:true
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"learn more",
                            linkto:'/login',
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codeColor={"text-yellow-25"}
                />
            </div>


            <ExploreMore/>
        </div>


        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg h-[333px]'>
                
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex  gap-7 text-white'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={'/login'}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5'>
                
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for about
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true}linkto={'/signup'}>
                            Learn more
                        </CTAButton>
                    </div>
                </div>

                
                <TimelineSection/>

                <LearningLanguageSection/>
            </div>
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mb-10 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
           
            <InstructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10 mb-10'>review from Other Learners</h2>

            {/* Review Slider here */}
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home
