import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ACCOUNT_TYPE} from '../../../utils/constants'

import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';
import { BiSolidRightArrow } from 'react-icons/bi';
import '../../../App.css'

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {
 
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {
        thumbnail:ThumbnailImage,
        price:CurrentPrice,

    }=course;

    const handleAddToCart=()=>{
        
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ){
            toast.error("You are an Instructor, you can't buy a course")
            return;
        }

        if(token){
            dispatch(addToCart(course));
            return
        }

        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }


    return(

    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 '>
        <img
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[150px] w-[400px] rounded-2xl object-cover'
        />
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Rs. {CurrentPrice}
        </div>
        <div className='flex flex-col gap-y-6'>
            <button
                className='yellowButton'
                onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                    ? ()=>navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            >
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course":"Buy Now"
                }
            </button>

            {
                (!course?.studentsEnrolled.includes(user?._id)) && (
                    <button
                        className='blackButton'
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                )
            }
        </div>

        <div>
            <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                30-Day Money-Back Guarantee
            </p>
            <p className='my-2 text-xl font-semibold'>
                This Course Includes:
            </p>
            <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                {
                    course?.instructions?.map((item,index)=>(
                        <p key={index} className='flex gap-2'>
                            <BiSolidRightArrow/>
                            <span>Item</span>
                        </p>
                    ))
                }
            </div>
        </div>

        <div className='text-center'>
            <button
                className='mx-auto flex items-center gap-2 text-yellow-100 p-6 '
                onClick={handleShare}
            >
                Share
            </button>
        </div>
    </div>
    
  )
}

export default CourseDetailsCard
