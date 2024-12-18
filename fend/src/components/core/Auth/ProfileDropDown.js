import React, { useRef, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import {VscDashboard,VscSignOut} from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'

import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
const ProfileDropDown = () => {

  const {user}=useSelector((state)=>state.profile)

  const [open,setOpen]=useState(false)
  const ref=useRef(null)
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  useOnClickOutside(ref,()=>setOpen(false))

  if(!user) return null
  
  return (
    <button className='relative' onClick={()=>setOpen(true)}>
        <div className='flex items-center gap-x-1'>
            <img 
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className='w-[30px] rounded-full object-cover' 
            />
            <AiOutlineCaretDown className='text-sm text-richblack-100'/>
        </div>

      {
        open && (
          <div 
            onClick={(e)=>e.stopPropagation()}
            className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700  border-[1px] border-richblack-700 bg-richblack-800'
            ref={ref}
          >
            <Link to={'/dashboard/my-profile'} onClick={()=>setOpen(false)}>
                <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                    <VscDashboard className='text-lg'/>
                    Dashboard
                </div>
            </Link>
            <div
              o
              onClick={()=>{
                dispatch(logout(navigate))
                setOpen(false)}}
              className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'
            >
                <VscSignOut className='text-lg'/>
                Logout
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown


// Purpose of useRef
// Accessing DOM Elements: The primary purpose of useRef in this code is to provide a way to access the DOM element of the dropdown menu directly. This is necessary for detecting clicks outside of it. By attaching the ref to the dropdown menu's container, the useOnClickOutside hook can determine whether a click occurred inside or outside of that element.

// Mutable Object: The useRef hook returns a mutable object whose .current property can be modified. This means you can store a reference to a DOM element and use it later without causing a re-render of the component.

// Avoiding Re-renders: Unlike state, changing the .current property of a ref does not trigger a re-render of the component. This is useful for performance and for maintaining the reference to the element without affecting the rendering process.

// In summary, useRef is crucial in this implementation for managing the dropdown's visibility based on user interactions, specifically for detecting clicks outside the dropdown and closing it when necessary.