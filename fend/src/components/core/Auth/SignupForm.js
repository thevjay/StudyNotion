import React, { useState } from 'react'
import Tab from '../../common/Tab'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../../slices/authSlice'
import { sendOtp } from '../../../services/operations/authAPI'

const SignupForm = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()


  //student or instructor
  const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)

  const [formData,setFormData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
  })

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)

  const {firstName,lastName,email,password,confirmPassword}=formData

  // Handle input fields, when some value changes
  const handleOnChange=(e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))
  }

  // Handle Form Submission
  const handleOnSubmit=(e)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error('Password Do Not Match')
      return
    }
    const signupData={
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email,navigate))


    //reset
    setFormData({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]
  
  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* form */}
      <form className='w-full flex flex-col gap-y-4' onSubmit={handleOnSubmit}>
        <div className='flex gap-x-4'>
            <label>
              <p className='text-[12px] leading-2 text-richblack-5 mb-1'>
                First Name <sup className='text-pink-200'>*</sup>
              </p>
              <input  
                required
                type='text'
                name='firstName'
                value={firstName}
                onChange={handleOnChange}
                placeholder='Enter first name'
                style={{
                  boxShadow:'inset 0px -1px 0px rgba(255,255,255,0.18)',
                }}
                className='w-full rounded-[12px] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>
            <label>
              <p className='text-[12px] leading-2 text-richblack-5 mb-1'>
                Last Name <sup className='text-pink-200'>*</sup>
              </p>
              <input  
                required
                type='text'
                name='lastName'
                value={lastName}
                onChange={handleOnChange}
                placeholder='Enter last name'
                style={{
                  boxShadow:'inset 0px -1px 0px rgba(255,255,255,0.18)',
                }}
                className='w-full rounded-[12px] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>
        </div>
        <label>
              <p className='text-[12px] leading-2 text-richblack-5 mb-1'>
                Email Address <sup className='text-pink-200'>*</sup>
              </p>
              <input  
                required
                type='text'
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder='Enter first name'
                style={{
                  boxShadow:'inset 0px -1px 0px rgba(255,255,255,0.18)',
                }}
                className='w-full rounded-[12px] bg-richblack-800 p-[12px] text-richblack-5'
                />
        </label>
        <div className='flex gap-x-4'>
            <label className='relative'>
              <p className='mb-1 text-[15px] leading-5 text-richblack-5'>
                Create Password <sup className='text-pink-200'>*</sup>
              </p>
              <input
                required
                type={showPassword ? 'text':'password'}
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[12px] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
              />
              <span
                onClick={()=>setShowPassword((prev=>!prev))}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showPassword ?
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2Bf'/>)
                :(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
              </span>
            </label>
            <label className='relative'>
              <p className='mb-1 text-[15px] leading-5 text-richblack-5'>
                Confirm Password <sup className='text-pink-200'>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? 'text':'password'}
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder='Confirm Password'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[12px] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
              />
              <span
                onClick={()=>setShowConfirmPassword((prev=>!prev))}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showPassword ?
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2Bf'/>)
                :(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
              </span>
            </label>
        </div>
        <button
          type='submit'
          className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
