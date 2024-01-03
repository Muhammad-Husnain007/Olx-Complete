import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signinStyles from './signin.module.css';
import loginImage from './assest/loginImage.jpg';
import hideImage from './assest/hide.png';
import seeImage from './assest/see.png';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showImage, setShowImage] = useState(seeImage);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShowImage((prevImage) =>
    prevImage === hideImage ? seeImage : hideImage
    );
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const signinForm = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    // setEmail('');
    // setPassword('');
    setLoading(true); // Set loading to true when signing in

    try {
      const response = await fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data sent successfully!');
        setTimeout(() => {
          setLoading(false); // Set loading to false after a certain time
          navigate('/home');
        }, 2000); // Set a loading time of 2 seconds (2000 milliseconds)
      } else {
        if (response.status === 401) {
          setErrorMessage('Invalid email or password');
        } else {
          console.error('Error in sign-in:', response.statusText);
        }
        setLoading(false); // Set loading to false if there's an error
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className={signinStyles['main-div']}>
      <div className={signinStyles['signin-image']}>
        <img src={loginImage} alt="Login" className={signinStyles['signin-img']} />
      </div>
      <div className={signinStyles['signin-form']}>
        <form onSubmit={signinForm}>
        <label>Enter Email: </label> <br />
          <input className={signinStyles['signinInput']} type="email" required placeholder='Enter Your Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> <br />
          <label>Enter Password: </label> <br />
      
      <input
        type={passwordVisible ? 'text' : 'password'}
        required
        placeholder="Enter Your password"
        name="password"
        value={password}
        onChange={handleInputChange}
        className={signinStyles['signinInput']}

      /> <br />
      <img
        src={showImage}
        alt="Toggle Password Visibility"
        onClick={togglePasswordVisibility}
        style={{width: 20, height: 20, position: 'relative', left: 460, top: -55}}
      />
  
          <button disabled={loading}>Login</button>
          <br />
          <a style={{ marginTop: 10, fontSize: 13, marginLeft: 20, textDecoration: 'none' }} href="/signup">
            If you are not signed up, go to Signup
          </a>
        </form>
        {errorMessage && <p className={signinStyles['error-message']}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Signin;
