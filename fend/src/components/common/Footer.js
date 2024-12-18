import React from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa6'

import {FooterLink2} from '../../data/Footer-Link'

const BottomFooter=['Privacy Policy','Cookie Policy','Terms']

const Resources=[
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]

const Plans=['Paid memberships','For students','Business solutions']
const Community=['Forums','Chapters','Events'];


const Footer = () => {
  return (
    <div className='bg-richblack-800'>
      <div className='flex lg:flex-row gap-8 justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
        <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-yellow-25 gap-6 '>

            {/* Section 1 */}
            <div className='lg:w-[50%] flex flex-wrap flex-row justify-between gap-3 lg:border-richblack-700'>
                <div className='w-[30%] flex flex-col gap-3 mb-7'>
                    <img src={Logo} alt='' className='object-contain'/>
                    <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>
                    <div className='flex flex-col gap-2'>
                      {["About","Careers","Affiliates"].map((ele,i)=>{
                        return(
                          <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                            <Link to={ele.toLowerCase()}>{ele}</Link>
                          </div>
                        )
                      })}
                    </div>
                    <div className='flex gap-3 text-lg'>
                        <FaFacebook/>
                        <FaGoogle/>
                        <FaTwitter/>
                        <FaYoutube/>
                    </div>
                </div>

                <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                  <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>

                  <div className='flex flex-col gap-2 mt-2'>
                    {Resources.map((ele,i)=>{
                      return(
                        <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                          <Link to={ele.split(" ").join('-').toLowerCase()}>{ele}</Link>
                        </div>
                      )
                    })}
                  </div>

                  <h1 className='text-richblack-50 font-semibold text-[16px] mt-1 mb-1'>Support</h1>

                  <div>
                    <Link to={'/help-center'}>Help center</Link>
                  </div>
                </div>

                <div className=''>
                    <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>
                    <div className='flex flex-col gap-2 mt-2 mb-2'>
                      {Plans.map((ele,i)=>{
                        return(
                          <div key={i}>
                              <Link to={ele.split(" ").join('-').toLowerCase()}>{ele}</Link>
                          </div>
                        )
                      })}
                    </div>
                    <h1 className='text-richblack-50 font-semibold text-[16px]'>Community</h1>

                    <div className='flex flex-col gap-2 mt-2'>
                      {Community.map((ele,i)=>{
                        return(
                          <div key={i}>
                              <Link to={ele.split(' ').join('-').toLowerCase()}>{ele}</Link>
                          </div>
                        )
                      })}
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className='lg:w-[50%] flex flex-wrap flex-row justify-between gap-3'>
                  {FooterLink2.map((ele,i)=>{
                    return(
                      <div key={i}>
                          <h1 className='text-richblack-50 font-semibold text-[16px]'>{ele.title}</h1>
                          <div className='flex flex-col gap-2 mt-2'>
                             {ele.links.map((link,i)=>{
                                return(
                                  <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                      <Link to={link.link}>{link.title}</Link>
                                  </div>
                                )
                             })}
                          </div>
                      </div>
                    )
                  })}
            </div>  
        </div>
      </div>

      <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm'>
          {/* Section 1 */}
          <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full'>
            <div className='flex flex-row gap-3'>
                  {BottomFooter.map((ele,i)=>{
                    return(
                      <div key={i}
                        className={`${BottomFooter.length-1===i ?"":"border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"}`}
                      >
                          <Link to={ele.split(' ').join('-').toLowerCase()} >{ele}</Link>
                      </div>
                    )
                  })}
            </div>
            
            <div className='text-center'>Made with ❤️ Code © 2023</div>
          </div>
      </div>
    </div>
  )
}

export default Footer
