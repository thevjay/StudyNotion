import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { RiEditBoxLine } from "react-icons/ri"


const MyProfile = () => {

    const {user}=useSelector((state)=>state.profile)

    //console.log("My Profile",user)
    const navigate=useNavigate()


    
  return (
    <div>
        <div className='mb-12'>
            <span className='text-richblack-25'>Dashboard/</span>
            <span className='text-yellow-25'>My Profile</span>
        </div>
        <h1 className='mb-14 textt-3xl font-medium text-richblack-5'>
            My profile
        </h1>
        {/* section 1 */}
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 px-12 p-8'>
            <div className='flex items-center gap-x-4'>
                <img 
                    src={user?.image}  
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'    
                />
                <div className='space-y-1'>
                    <p className='text-richblack-5 text-lg font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-richblack-300 text-sm'>{user?.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onclick={()=>{
                    navigate('/dashboard/settings')
                }}
            >
                <RiEditBoxLine/>        
            </IconBtn>
        </div>
        
        {/* section 2 */}

        <div className='flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 my-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <IconBtn
                    text='Edit'
                    onclick={()=>{
                        navigate('/dashboard/settings')
                    }}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.about ?? 'Write Something about Yoursefl'}</p>
        </div>

        {/* section 3 */}
        <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
                <IconBtn
                    text='Edit'
                    onclick={()=>{
                        navigate('/dashboard/settings')
                    }}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            <div className='flex max-w-[700px] justify-between gap-x-5'>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>FirstName</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender}</p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>LastName</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber}</p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile
