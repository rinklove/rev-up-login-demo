import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div
      className='nav-container'
    >
      <div>
      <Link 
        className='auth-a'
        to='/'
      >
        소셜 로그인 테스트
      </Link>
      </div>
      <div
        className='user-container'
      >
        <Link 
          className='auth-a'
          to='/'
        >
          테스트용 발급 사이트로 이동
        </Link>
        <Link
         className='auth-a'
         to='/release'
        >
          배포용 발급 사이트로 이동
        </Link>
      </div>
    </div>
  )
}

export default Navbar
