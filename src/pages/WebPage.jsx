import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import ReleaseMainDiv from '../components/main/ReleaseMainDiv'

const WebPage = () => {
  return (
    <>
      <Navbar/>
      <div
        className='web-body'
      >
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
        </div>
      <Footer/>
    </>
  )
}

export default WebPage
