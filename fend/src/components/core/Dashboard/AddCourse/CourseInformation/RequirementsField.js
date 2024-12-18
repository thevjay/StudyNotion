import React, { useEffect, useState } from 'react'

const RequirementsField = ({
    name,
    label,
    register,
    errors,
    setValue,
    setValues
}) => {

    const [requirement,setRequirement]=useState('')
    const [requirementList,setRequirementList]=useState([])


    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])

    const handleAddRequirement=()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement('')
        }
    
    }

    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList=[...requirementList]
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>
        <label htmlFor={name} className='text-richblack-100'>{label}<sup className='text-pink-200'>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                className='w-full text-richblue-400'
            />
            <button
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50'
            >
                Add
            </button>
        </div>

        {
            requirementList.length > 0 &&(
                <ul>
                    {requirementList.map((requirement,index)=>(
                        <li key={index} className='flex items-center text-richblack-5 gap-x-3'>
                            <span>{requirement}</span>
                            <button
                                type='button'
                                onClick={()=>handleRemoveRequirement(index)}
                                className='text-sm text-pure-greys-100'
                            >Clear</button>
                        </li>
                    ))}
                </ul>
            )
        }
        {
            errors[name] &&(
                <span>
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default RequirementsField
