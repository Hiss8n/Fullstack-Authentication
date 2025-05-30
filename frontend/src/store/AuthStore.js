

import {create} from 'zustand'
import axios from 'axios'
axios.defaults.withCredentials=true;
const API_URL='http://localhost:3000/api/auth'
export const useAuthStore=create((set)=>({
    user:null,
    isAuthenticated:null,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,



    signup:async(email,password,name)=>{
        set({isLoading:true,error:null});
        try {

            const response=await axios.post(`${API_URL}/register`,{email,password,name});
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
            
        } catch (error) {
            set({error:error.response.data.message || "error signing up",isLoading:false})
            throw error;
        }
    },


    login:async(email,password)=>{
        set({isLoadind:true,error:null});
        try {

            const response=await axios.post(`${API_URL}/login`,{email,password});
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
            
        } catch (error) {
            set({error:error.response.data.message || "error signing up",isLoading:false})
            throw error;
        }
    },

    verifyEmail:async(code)=>{
     set({isLoading:true,error:null});
     try {
        const response=await axios.post(`${API_URL}/verify-email`,{code});
        set({user:response.data.user, isAuthenticated:true,isLoading:false});
        return code;
     } catch (error) {
        console.log(error)
        set({error:error.response.data.message || "Error sending verification email",isLoading:false})
        throw error
        
     }
    },

    checkAuth:async()=>{
        
        /* await new Promise((resolve)=> setTimeout(resolve,2000));  How to sleep for hours*/

     set({isCheckingAuth:true,error:null});
     try {
        const response= await axios.get(`${API_URL}/check-auth`);
        set({user:response.data.currentUser,isAuthenticated:true,isCheckingAuth:false})
        
     } catch (error) {
        set({error:null,isCheckingAuth:false});
        
     }
    },

    logout:async()=>{
        set({isLoading:false,error:null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user:null,isAuthenticated:false,error:null, isLoading:false});
            
        } catch (error) {
            set({error:"Error logingout",isLoading:false})
            throw error
        }
    },
    forgotPassword:async(email)=>{
        set({isLoaiding:true,error:null,message:null})
        try {
            const response=await axios.post(`${API_URL}/forgot-password`,{email});
            set({message:response.data,isLoading:false});
            
        } catch (error) {
            set({isLoading:false, error:error.response.data.message || "Error sending reset password link,try later"});
            throw error;
            
        }

    },
    resetPassword:async(token,password)=>{
        set({isLoading:true,error:null})
        try {
            const response=await axios.post(`${API_URL}/reset-password/${token}`,{password});
            set({message:response.data.message,isLoading:false})
            
        } catch (error) {
            set({isLoaiding:false,error:error.response.data.message || "Error reseting password"})
           throw error; 
        }
    }



}))