import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { catalogData, categories } from '../services/apis'
import { getCatalogaPageData } from '../services/operations/pageAndComponentData'
import Footer from '../components/common/Footer'
import CourseCard from '../components/core/Catalog/CourseCard'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import '../App.css'

const Catalog = () => {

    const {catalogName}=useParams()
    const [catalogPageData,setCatalogPageData]=useState(null)
    const [categoryId,setCategoryId]=useState("");
    const [active,setActive]=useState(1)
    const [loading,setLoading]=useState(false)

    
    //Fetch all Categories
    useEffect(()=>{
        const getCategories=async()=>{
            const res=await apiConnector("GET",categories.CATEGORIES_API)
            const category_id=res?.data?.data?.filter((ct)=> ct.name.split(" ").join("-").toLowerCase()=== catalogName.split(" ").join("-").toLowerCase())[0]._id
                
            setCategoryId(category_id)
            
        }
        getCategories()
    },[catalogName])


    useEffect(()=>{
        const getCategoryDetails=async()=>{
            try{
                const res=await getCatalogaPageData(categoryId)
                //console.log("Category Id",categoryId)
                if(res.success){
                    setCatalogPageData(res)
                }else{
                    setCatalogPageData(null)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        if(categoryId){
            getCategoryDetails()
        }
    },[categoryId])


  return (
    <div className='box-content bg-richblack-800 px-4'>
      
        <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
            <p className='text-sm text-richblack-300'>{`Home / Catalog /`}
                <span className='text-yellow-25'>
                    {catalogPageData?.name}
                </span>
            </p>
            <p className='text-3xl text-richblack-5'>{catalogPageData?.name}</p>
            <p className='max-w-[870px] text-richblack-200'>{catalogPageData?.description}</p>
        </div>

        <div>
            {/* section 1 */}
            <div className='mx-auto box-content w-full max-w-maxContent px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading'>Courses to get you started</div>
                <div className='flex my-4 border-b border-b-richblack-600 text-sm'>
                    <p
                        className={`px-4 py-2 ${active ===1 ? "border-b-yellow-25 border-b text-yellow-25" : "text-richblack-50"} cursor-pointer`}
                        onClick={()=>setActive(1)}
                    >Most Popular</p>
                    <p
                        className={`px-4 py-2 ${active ===2 ?"border-b border-b-yellow-25 text-yellow-25":'text-richblack-50'} cursor-pointer`}
                        onClick={()=>setActive(2)}
                    >New</p>
                </div>
                
                <div>
                    <CourseSlider Courses={catalogData?.selectedCourses?.course}/>
                </div>
                
            </div>

            {/* section 2 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading'>Checkout {catalogPageData?.differentCourses.name} Courses Also</div>
                {/* <p>Top Courses {catalogPageData?.data?.selectedCategory?.name}</p> */}
                <div className='py-8'>
                    <CourseSlider Courses={catalogPageData?.differentCourses?.course} />
                </div>
            </div>

            {/* section 3 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading'>Most Selling Courses</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>

                        {
                            catalogPageData?.mostSellingCourses.length === 0 ? (<p className='text-2xl text-white'>No Most Selling Courses</p>) : (catalogPageData?.mostSellingCourses?.slice(0,4)
                                .map((course,index)=>(
                                    <CourseCard course={course} key={index} Height={"h-[400px]"}/>
                                )))
                        }
                    </div>
                </div>
            </div>

        </div>

        <Footer/>
    </div>
  )
}

export default Catalog

