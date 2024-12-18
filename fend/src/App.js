import React, { useEffect } from 'react'
import { Route,Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings/Index'
import { ACCOUNT_TYPE } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import Cart from './components/core/Dashboard/Cart'
import ViewCourse from './pages/ViewCourse'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import ContactPage from './pages/ContactPage'
import PageNotFound from './pages/PageNotFound'
import CreateCategory from './components/core/Dashboard/CreateCategory'
import Allstudents from './components/core/Dashboard/Allstudents'
import Allinstructors from './components/core/Dashboard/Allinstructors'

const App = () => {

  const {user}=useSelector((state)=>state.profile)



  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='/catalog/:catalogName' index element={<Catalog/>}/>
          <Route path='/course/:courseId' element={<CourseDetails/>}/>
          
          <Route path='login' element={
            <OpenRoute>
                <Login/>
            </OpenRoute>
          }/>
          <Route path='forgot-password'
              element={
                <OpenRoute>
                  <ForgotPassword/>
                </OpenRoute>
              }
          />
          <Route path='signup' element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
          }/>
          <Route  
              path='verify-email'
              element={
                <OpenRoute>
                  <VerifyEmail/>
                </OpenRoute>
              }
          />
          <Route  
              path='update-password/:id'
              element={
                <OpenRoute>
                  <UpdatePassword/>
                </OpenRoute>
              }
          />
          <Route
            path='about'
            element={
              <About/>
            }
          />

          <Route
            path='contact'
            element={
              <ContactPage/>
            }
          />

          
          <Route
            element={
              
                <Dashboard/>

            }
          >
            <Route path='dashboard/my-profile' element={<MyProfile/>} />
            <Route path='dashboard/settings' element={<Settings/>}/>



          {/* Route only for Admin */}
          {/* create category, all students, all instructors */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN &&(
            <>
              <Route path="dashboard/create-category" element={<CreateCategory />} />
               <Route path="dashboard/all-students" element={<Allstudents />} />
              <Route path="dashboard/all-instructors" element={<Allinstructors />} /> 
            </>
          )}

          {/* Route only for Students */}
          {/* cart , EnrolledCourses */}
          {
              user?.accountType===ACCOUNT_TYPE.STUDENT &&(
                <>
                  <Route path='dashboard/cart' element={<Cart/>}/>
                  {/* EnrolledCourses */}
                  <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
                </>
              )
            }

            {/* Route only for Instructors */}
            {/* add course , MyCourses, EditCourse*/}
            {
              user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
                <>
                  <Route path='dashboard/instructor' element={<Instructor/>}/>
                  <Route path='dashboard/add-course' element={<AddCourse/>}/>
                  <Route path='dashboard/my-courses' element={<MyCourses/>}/>
                  <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
                </>
              )
            }
          </Route>

          {/* For the watching course lectures */}
          <Route element={<ViewCourse/>}>
              {
                user?.accountType=== ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route  path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
                      element={<VideoDetails/>}
                    />
                  </>
                )
              }
          </Route>



        {/* Page Not Found (404 Page ) */}
        <Route path="*" element={<PageNotFound />} />


      </Routes>
    </div>
  )
}

export default App
