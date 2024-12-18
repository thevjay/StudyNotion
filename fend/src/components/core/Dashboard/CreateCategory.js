import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { IoIosAdd } from 'react-icons/io';
import { createNewCategory } from '../../../services/operations/courseDetailsAPI';

const CreateCategory = () => {

    const {token} =useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false)
    const [newCategory,setNewCategory]=useState('');
    const [description,setDescription]=useState('');

    // loading skeleton
    const LoadingSkeleton = () => {
    return (<div className="flex  flex-col gap-6 ">
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
    </div>)
  }

    //create new category
    const handleCreateCategory=async()=>{
        await createNewCategory(newCategory,description,token)
        setNewCategory('')
        setDescription('')
    }

  return (
    <div className='border-[1px] border-richblack-700 rounded-2xl bg-richblack-800  p-8 px-7 sm:px-12'>
      <h1 className='mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left'>Create Category</h1>

      <div className='flex flex-col sm:flex-row gap-5 items-center'>
        <div className='flex flex-col w-full gap-5'>
            <input
                type='text'
                value={newCategory}
                placeholder='Enter new category name'
                onChange={(e)=> setNewCategory(e.target.value)}
                className='text-white pl-4 w-full h-10 bg-transparent border-2 border-yellow-500 focus:border-none outline-yellow-25 rounded-2xl'
            />
            <input
                type='text'
                value={description}
                placeholder='Enter new category name'
                onChange={(e)=> setDescription(e.target.value)}
                className='text-white pl-4 w-full h-10 bg-transparent border-2 border-yellow-500 focus:border-none outline-yellow-25 rounded-2xl'
            />
        </div>

        <IconBtn
            type='Add'
            onclick={handleCreateCategory}
            disabled={!newCategory || !description}
        >
            <IoIosAdd/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CreateCategory
