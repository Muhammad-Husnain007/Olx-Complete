import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from './assest/signup-image.webp';
import signupStyles from './signup.module.css';
import hideImage from './assest/hide.png';
import seeImage from './assest/see.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPImage, setShowPImage] = useState(seeImage);
  const [showCPImage, setShowPCImage] = useState(seeImage);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShowPImage((prevImage) =>
    prevImage === hideImage ? seeImage : hideImage
    );
  };
  const toggleConfirmPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShowPCImage((prevImage) =>
    prevImage === hideImage ? seeImage : hideImage
    );
  };


  const submitForm = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
    };

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data sent successfully!');

        setTimeout(() => {
          setLoading(false);
          navigate('/home');
        }, 4000); // Set a loading time of 2 seconds (2000 milliseconds)
      } else {
        console.error('Failed to send form data');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      setLoading(false);
    }
  };

  return (
    <div className={signupStyles['main-div']}>
      <div className={signupStyles['signup-image']}>
        <img src={signupImage} alt="" className={signupStyles['signup-img']} />
      </div>
      <div className={signupStyles['signup-form']}>
        <form onSubmit={submitForm}>
        <label>Name* </label> <br />
          <input className={signupStyles['signupInput']} type="text" placeholder='Enter Your Name' name="name" value={name} onChange={(e) => setName(e.target.value)} /> <br /> <br />
          <label>Email* </label> <br />
          <input className={signupStyles['signupInput']} type="email" placeholder='Enter Your Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> <br />
          <label>Password* </label> <br />
          <input
        type={passwordVisible ? 'text' : 'password'}
        required
        placeholder="Enter Your password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={signupStyles['signupInput']}

      /> <br />
      <img
        src={showPImage}
        alt="Toggle Password Visibility"
        onClick={togglePasswordVisibility}
        style={{width: 20, height: 20, position: 'relative', left: 460, top: -30}}
      />
  
          <label>Confirm Password* </label> <br />
          <input
        type={passwordVisible ? 'text' : 'password'}
        required
        placeholder="Enter Your Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={signupStyles['signupInput']}

      /> <br />
      <img
        src={showCPImage}
        alt="Toggle Password Visibility"
        onClick={toggleConfirmPasswordVisibility}
        style={{width: 20, height: 20, position: 'relative', left: 460, top: -30}}
      />
  
          <label>Phone* </label> <br />
          <input className={signupStyles['signupInput']} type="phone" placeholder='Enter Your Phone Number' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> <br /> <br />
          <label>Gender* </label> <br />
          <input className={signupStyles['signupInput']} type="gender" placeholder='Enter Your Gender' name="gender" value={gender} onChange={(e) => setGender(e.target.value)} /> <br /> <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <br />
          <a style={{ marginTop: 10, fontSize: 13, marginLeft: 20, textDecoration: 'none' }} href="/signin">
            If you are already signed up, go to Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
