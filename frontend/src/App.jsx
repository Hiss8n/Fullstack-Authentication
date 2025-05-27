import FloatingShapes  from "./components/floatingShapes";
import {Routes,Route, Navigate} from "react-router-dom"
import HomePages from "./pages/DashBoard";
import SignUpPages from "./pages/SignUp";
import LoginPages from "./pages/LoginPage";
import {Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ResetP from "./pages/ResetP.jsx";
import NotFound from "./pages/NotFound.jsx";



const ProtectedRoute=({children})=>{
  const {isAuthenticated,user}=useAuthStore()

  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }
  if(!user.isVerified){
    return <Navigate to ='/verify-email' replace/>
  } 
  return children
}


//redirect Authenticated users to the home pages only

const RedirectAuthenticatedUser=({children})=>{

  const {isAuthenticated,user}=useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace/>
  }
   return children;

 }

const App=()=> {

  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore()


  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log("User:",user)
  console.log("isAuthenticated",isAuthenticated)

  if(isCheckingAuth ) return <LoadingSpinner/>;

  return (
    <div className="min-h-screen bg-white-100 
    flex justify-center items-center overflow-hidden relative">

   <FloatingShapes color="bg-gradient-to-br from-pink-500 via-pink-800 to-white-100 shadow-xl"  left="-16%"  delay={5} top="-13%" size="w-[400px] h-[400px]"/>
    <FloatingShapes color="bg-gradient-to-tl from-blue-800 via-blue-600 to-white-500 "  right="-12%"  delay={0} top="-18%" size="w-[400px] h-[400px]"/>
       <FloatingShapes color="bg-gradient-to-br from-yellow-500 via-white-500 to-white-300 shadow-4xl"  left="24%"  delay={1} top="-12%" size="w-[480px] h-[480px]"/>
 
 {/* Route */}
 <Routes>
  <Route path="/" element={
    <ProtectedRoute>
      <HomePages/>
    </ProtectedRoute>
  }/>
  <Route path="/signup" element={
    <RedirectAuthenticatedUser>
    <SignUpPages/>
  </RedirectAuthenticatedUser>}/>
  <Route path="/login" element={
    <RedirectAuthenticatedUser>
    <LoginPages/>
  </RedirectAuthenticatedUser>}/>
  <Route path="/forgot-Password" element={
    <RedirectAuthenticatedUser>
      <ForgotPasswordPage/>
    </RedirectAuthenticatedUser>
    
    }/>

  <Route path="/verify-email" element={
    <RedirectAuthenticatedUser>
      <VerifyEmail/>
    </RedirectAuthenticatedUser>
  }/>
  <Route path='/reset-password/:token' element={
    <RedirectAuthenticatedUser>
               <ResetP/>
    </RedirectAuthenticatedUser>}/>
    
   <Route path="*" element={<NotFound/>} />
</Routes>
 <Toaster/>
    </div>
  )
}

export default App
