import React from 'react'
import {useSelector} from 'react-redux'
import frameImg from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import './Spinner.css'


const Template = ({title,description1,description2,image,formType}) => {

    const {loading} =useSelector((state)=>state.auth)

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {loading ?(
        <div className='spinner'></div>
      ):(
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-row justify-between gap-y-12 py-12'>
            <div className='mx-auto w-11/12 max-w-[450px]'>
                <h1 className='text-2xl font-semibold leading-4 text-richblack-5'>{title}</h1>
                <p className='mt-4 text-xl leading-5 '>
                    <span className='text-richblack-100'>{description1}</span>{" "}
                    <span className='font-edu-sa font-bold italic text-xl text-blue-100 '>
                        {description2}
                    </span>
                </p>
                {formType === 'signup' ? <SignupForm/>:<LoginForm/>}
            </div>
            <div className='relative mx-auto w-11/12 max-w-[450px]  md:mx-0'>
                <img 
                    src={frameImg}
                    alt='Pattern'
                    width={558}
                    height={504}
                    loading='lazy'
                />
                <img
                    src={image}
                    alt='Students'
                    width={558}
                    height={504}
                    loading='lazy'
                    className='absolute -top-4 right-4 z-10'
                />
            </div>
        </div>
      )}
    </div>
  )
}

export default Template
