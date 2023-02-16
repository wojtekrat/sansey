import React from 'react'
import { AiFillFacebook, AiOutlineLinkedin } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 W. Ratajczak All rights reserved</p>
      <p className='icons'>
        <AiFillFacebook/>
        <AiOutlineLinkedin/>
      </p>
    </div>
  )
}

export default Footer