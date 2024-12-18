import React, { useEffect, useState } from 'react'
import {useForm } from 'react-hook-form'
import CountryCode from '../../data/countrycode.json';

const ContactUsForm = () => {

    const [loading,setLoading]=useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();


    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:'',
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:'',
            })
        }
    },[reset,isSubmitSuccessful])


  return (
    <form>

        <div className='flex gap-5 flex-col lg:flex-row'>
            {/* firstName */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label className='text-sm' htmlFor='firstname'>First Name</label>
                <input
                    typeof='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className='text-black form-style'
                    {...register("firstname",{required:true})}
                />
                {
                    errors.firstname && (
                        <span>
                            Please enter Your name
                        </span>
                    )
                }
            </div>

            {/* lastName */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label className='text-sm' htmlFor='lastname'>Last Name</label>
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    className='text-black form-style'
                    placeholder='Enter Last name'
                    {...register('lastname')}
                />
            </div>
        </div>

        {/* email */}
        <div className='flex flex-col gap-2'>
            <label>Email Address</label>
            <input
                type='email'
                name='email'
                id='email'
                className='text-black form-style'
                placeholder='Enter email address'
                {...register("email",{required:true})}
            />
            {
                errors.email &&(
                    <span>
                        Please enter your email address
                    </span>
                )
            }
        </div>

        {/* phoneNo */}
        <div className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor='phonenumber'>Phone Number</label>
            <div className='flex gap-5'>
                {/* dropdown */}
                <div className='flex w-[81px] flex-col gap-2'>
                    <select
                        name='dropdown'
                        id='dropdown'
                        className='form-style'
                        {...register("countrycode",{required:true})}
                    >
                        {
                            CountryCode.map((element,index)=>(
                                <option key={index} value={element.code}>
                                    {element.code}-{element.country}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <input
                        type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        className='form-style'
                        {...register("phoneNo",{
                            required:{value:true,message:"Please enter Phone Number"},
                            maxLength:{value:10,message:"Invalid Phone Number"},
                            minLength:{value:8,message:"Invalid Phone Number"}
                        })}
                    />

                </div>

            </div>
            {
                errors.phoneNo &&(
                    <span>
                        {errors.phoneNo.message}
                    </span>
                )
            }
        </div>

        {/* message */}
        <div className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor='message'>Message</label>
            <textarea
                name='message'
                id='message'
                cols='30'
                className='form-style'
                rows='7'
                placeholder='Enter Your message here'
                {...register("message",{required:true})}
            />
            {
                errors.message && (
                    <span>
                        Please enter your message.
                    </span>
                )
            }
        </div>
        <button
            type='submit'
            className='rounded-md mt-4 bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black 
            shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:shadow-none disabled:bg-richblack-500 sm:text-[16px]'    
        >
            Send Message
        </button>
    </form>
  )
}

export default ContactUsForm
