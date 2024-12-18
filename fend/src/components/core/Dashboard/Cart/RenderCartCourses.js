import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaStar} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'
import ReactStars from 'react-rating-stars-component'
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {

    const {cart}=useSelector((state)=>state.cart)
    const dispatch=useDispatch();

    

  return (
    <div className='text-white'>
      {
        cart.map((course,index)=>(
            <div>
                <div>
                    <img src={course?.thumbnail}/>

                    <div>
                        <p className='text-lg font-medium text-richblack-5'>{course?.courseName}</p>
                        <p className='text-sm text-richblack-300'>{course?.category?.name}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor='#ffd700'
                                emtpyIcon={<FaStar/>}
                                fullIcon={<FaStar/>}
                            />

                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-end space-y-2'>
                    <button
                        onClick={()=>dispatch(removeFromCart(course._id))}
                        className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p className='mb-6 text-3xl font-semibold text-yellow-100'>₹ {course?.price}</p>
                </div>
                
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
