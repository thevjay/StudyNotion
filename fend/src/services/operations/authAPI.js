import {toast} from 'react-hot-toast'

import {apiConnector} from '../apiconnector'

import { endpoints } from '../apis'
import { setLoading, setToken } from '../../slices/authSlice'
import {setUser} from '../../slices/profileSlice'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
}=endpoints


// Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.
export function sendOtp(email,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading('Loading...')
        dispatch(setLoading(true))

        try{
            const response=await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })

            console.log("SENDOTP API RESPONSE.....",response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate('/verify-email')
        }catch(error){
            console.log("SENDOTP API ERROR.........",error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }

}
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SIGNUP_API RESPONSE.........",response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup successfully")
            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP_API ERROR........",error.response ? error.response.data:error)
            toast.error("Could Not Sign up User")
            console.log("Details",accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                )
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))

        try{

            const response=await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })

            console.log("LOGIN API RESPONSE............", response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message) 
            }

            toast.success("Login Successfully")

            dispatch(setToken(response.data.token));
            

            const userImage=response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

             dispatch(setUser({...response.data.user,image:userImage}))

             localStorage.setItem("token",JSON.stringify(response.data.token))
             localStorage.setItem("user",JSON.stringify(response.data.user))          
            navigate('/dashboard/my-profile')
        }
        catch(error){
            console.log("LOGIN API ERROR............", error.response ? error.response.data:error)
            toast.error("Could Not LOGIN")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart(null))
        localStorage.removeItem('token')
        localStorage.removeItem('user');
        toast.success("Logout Out")
        navigate('/')
    }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        const toastId=toast.loading('Loading...')
        dispatch(setLoading(true));

        try{
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log("RESETPASSTOKEN_API RESPONSE............",response)

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Mail Sent Successful")
            setEmailSent(true);
        }
        catch(error){
            console.log("RESETPASSTOKEN_API ERROR............", error)
            toast.error("Could Not Send Mail")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading in reset password")
        dispatch(setLoading(true))

        try{

            const response=await apiConnector("POST",RESETPASSWORD_API,{
                password,confirmPassword,token
            })

            console.log("RESETPASSWORD_API RESPONSE............", response)

            console.log(response.data.success)
      
            if(!response.data.success){
              throw new Error(response.data.message)
            }
          
            toast.success("Password reset successful")
            navigate('/login')
      
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN Error", error.response ? error.response.data:error);
            toast.error("Unable to reset password");
        }
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}