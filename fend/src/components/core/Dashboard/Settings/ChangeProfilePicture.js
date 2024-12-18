import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'

import {FiUpload} from 'react-icons/fi'

import {GrInProgress} from 'react-icons/gr'
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI'

const ChangeProfilePicture = () => {

    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()

    const [loading,setLoading]=useState(false)
    const [imageFile,setImageFile]=useState(null)
    const [previewSource,setPreviewSource]=useState(null)


    const fileInputRef=useRef(null)

    const handleClick=()=>{
        fileInputRef.current.click()
    }

    const handleFileChange=(e)=>{
        const file=e.target.files[0]
        console.log(file)
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile=(file)=>{
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload=()=>{
        try{    

            console.log("Uploading...")
            setLoading(true)
            const formData=new FormData()
            formData.append('displayPicture',imageFile)
            console.log("formdata",formData)

            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false)
            })
        }   
        catch(error){
            console.log("ERROR MESSAGE-",error.message)
        }
    }


    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile])

  return (
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 md:px-12 text-richblack-5'>
        <div className='flex gap-x-4 items-center'>

            <div>
                <img src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[60px] rounded-full object-cover'
                />
            </div>

            <div className='space-y-2'>
                <h2 className='lg:text-lg text-md font-semibold text-richblack-5 uppercase tracking-wider'>Change Profile Picture</h2>
                <div className='flex flex-row gap-x-3'>

                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept='image/jpeg , image/gif, image/jpg ,image/png'
                    />

                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className={`bg-richblack-700 cursor-pointer text-richblack-50 lg:py-2 py-1 lg:px-5 px-2 font-semibold rounded-md `}
                    >
                        Select
                    </button>

                    <IconBtn
                        text={loading ? 'Uploading...' : 'Upload'}
                        onclick={handleFileUpload}
    
                    >
                        {
                            !loading ?
                                <FiUpload className='text-lg text-richblack-900'/>
                            :
                                <GrInProgress className='text-lg text-richblack-900'/>
                        }
                    </IconBtn>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture
