import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col justify-center items-center'>
        <h1>
            Get in Touch
        </h1>
        <p className='text-center text-richblack-300'>
            We'd love to here for you, Please fill out this form.
        </p>
        <div className='  lg:w-[50%] mt-4'>
            <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>Got a Idea? We've got the skills. Let's team up</h1>
                <p>Tell us more about yourself and what you're got in mind</p>
                <div className='mt-7'>
                    <ContactUsForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactFormSection
