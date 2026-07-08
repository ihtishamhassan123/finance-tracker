import { Box } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPages from './Pages/LandingPages'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPages from './Pages/DashboardPages'
import TransactionPage from './Pages/TransactionPage'
import PublicLayout from './layout/PublicLayout'
import PrivateLayout from './layout/PrivateLayout'
import LogoutPages from './pages/LogoutPages'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import TransactionProvider from './context/TransactionContext'
import AuthContextProvider from './context/authContext'
import ProfilePage from './pages/ProfilePage'
import ChangePassword from './pages/ChangePassword'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import DashboardContextProvider from './context/DashboardContext'

const App = () => {

  
  return (<AuthContextProvider>
    <TransactionProvider>
      <DashboardContextProvider>

  <Routes>
    <Route element={<PublicLayout/>}>
   <Route index element={<LandingPages/>}></Route>
    <Route path='login' element={<LoginPage/>}></Route>
    <Route path='register' element={<RegisterPage/>}></Route>
    <Route path='forget-password' element={<ForgetPassword/>}></Route>
<Route path='reset-password'element={<ResetPassword/>}></Route>   
    </Route>
    <Route element={<PrivateLayout/>}>
    <Route path='dashboard' element={<DashboardPages />}></Route>
    <Route path='transaction' element={<TransactionPage     />}></Route>
     <Route path='logout' element={<LogoutPages/>}></Route>
     <Route path='profile' element={<ProfilePage/>}></Route>
     <Route path='change-password' element={<ChangePassword/>}></Route>
    </Route>
   
  </Routes>
        </DashboardContextProvider>

  </TransactionProvider>
    </AuthContextProvider>

  )
}

export default App
