import React, { useState } from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart,registerables} from 'chart.js'


Chart.register(...registerables);

const InstructorChart = ({courses}) => {
  // State to keep track of the currently selected chart
    const [currChart,setCurrChart]=useState("students")

    console.log("courses",courses)
  // Function to generate random colors for the chart
  const getRandomColors=(numColors)=>{
        const colors=[]
        for (let i=0; i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random()*256)}
                , ${Math.floor(Math.random()*256)}
            )`
            colors.push(color);

        }
        return colors;
    }

    //create data chart displaying student info
    const chartDataForStudents={
      labels:courses?.map((course)=>course.courseName),
      datasets:[
        {
          data:courses?.map((course)=>course.totalStudentsEnrolled),
          backgroundColor:getRandomColors(courses.length)
        }
      ]
    }

      // console.log("chartDataStudents", chartDataStudents)

    //create data for chart displaying income info
    const chartDataForIncome={
      labels:courses?.map((course)=>course.courseName),
      datasets:[
        {
          data:courses?.map((course)=>course.totalAmountGenerated),
          backgroundColor:getRandomColors(courses.length)
        }
      ]
    }


    //create options
    const options={
      maintainAspectRatio: false,
    };

  return (
    <div className='flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-5'>
      <p className='text-lg font-bold text-richblack-5'>Visualise</p>
      <div className='space-x-4 font-semibold mb-5'>

        {/* Button to switch to the "students" chart */}
        <button
          onClick={()=> setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 
            ${currChart === 'students' ? 'bg-richblack-700 text-yellow-50' : 'text-yellow-400'}`}
        >
          student
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          onClick={()=>setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200
            ${currChart === 'income' ? "bg-richblack-700 text-yellow-50" :'text-yellow-400'}
            `}
        >
          Income
        </button>
      </div>

      <div className='relative mx-auto aspect-square h-full w-full'>
         {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === 'students' ? chartDataForStudents :chartDataForIncome}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
