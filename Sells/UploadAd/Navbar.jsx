import React, {useState} from 'react'
import olxImage from './assests/olxImage.svg'
import back from './assests/back.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
      window.history.go(-1);
  }
  const goHome = () => {
      navigate('/home');
  }

  return (
    <div>
      <div style={{ width: 1270, height: 70, background: '#F7F8F8' }}>
        <img style={{ width: 22, height: 24, marginBottom: 15, marginLeft: 20 }}
          onClick={goBack} src={back} alt="back"
        />
        <img style={{ width: 60, height: 60, marginLeft: 30, }}
          src={olxImage} alt="olx"
          onClick={goHome}
        />
      </div>
    </div>
  )
}

export default Navbar;
