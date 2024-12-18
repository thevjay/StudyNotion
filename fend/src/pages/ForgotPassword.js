import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {

    const [emailSent,setEmailSent]=useState(false)
    const [email,setEmail]=useState('')
    const {loading}=useSelector((state)=>state.auth)

    const dispatch=useDispatch()

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email,setEmailSent))
    }


  return (
    <div className='grid min-h-[calc(100-3.5rem)] place-items-center'>
      {
        loading?(
            <div className='spinner'></div>
        ):(
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className='text-xl font-semibold leading-5 text-richblack-5'>
                    {
                        !emailSent ? 'Reset your password':'Check Email'
                    }
                </h1>
                <p className='my-4 text-xl leading-5 text-richblack-100'>
                    {
                        !emailSent?
                         "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        :`We have sent reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {!emailSent &&(
                        <label>
                            <p>
                                Email Address
                            </p>
                            <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />    
                        </label>
                    )}
                    <button 
                        type='submit'
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                    >
                        {!emailSent ?'Submit':'Resend Email'}
                    </button>
                </form>
                <div className='mt-6 flex items-center justify-between'>
                    <Link to={'/login'}>
                        <p className='flex items-center gap-x-2 text-richblack-5'>
                            <BiArrowBack/> Back To Login
                        </p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
