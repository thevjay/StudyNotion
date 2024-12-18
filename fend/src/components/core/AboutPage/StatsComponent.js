import React from 'react'

const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];


const StatsComponent = () => {
  return (
    <div className='bg-richblack-700'>
        <div className='flex flex-col text-white'>
            <div className='flex gap-x-10 items-center justify-center'>
                {Stats.map((data,i)=>{
                    return(
                        <div key={i} className=''>
                            <h1 className='font-semibold'>{data.count}</h1>
                            <h2>{data.label}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default StatsComponent
