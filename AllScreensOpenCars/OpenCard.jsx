// OpenCard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../HomeScreen/Navbar/Navbar.jsx';
import Footer from '../HomeScreen/Footer/FooterList.jsx';
import locationImage from '../HomeScreen/Navbar/assest/location.png';
import chatImage from '../HomeScreen/Navbar/assest/chat.png';
import phoneImage from '../HomeScreen/Navbar/assest/telephone.png';
import './style.open.css'


const OpenCard = () => {
  const [data, setData] = useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/olx/api/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!data) {
    return <p>Loading...</p>; // Display a loading indicator if data is still loading
  }
  const showNumber = () => {
    setShowPhoneNumber(true); // Show the phone number when the span is clicked
  };

  const getTimeDifference = (dateString) => {
    const dateUploaded = new Date(dateString);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - dateUploaded.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    if (differenceInDays < 1) {
      return 'Today';
    } else if (differenceInDays < 2) {
      return '1 day ago';
    } else if (differenceInDays < 7) {
      return `${Math.floor(differenceInDays)} days ago`;
    } else if (differenceInDays < 14) {
      return '1 week ago';
    } else if (differenceInDays < 365) {
      return `${Math.floor(differenceInDays / 7)} weeks ago`;
    } else if (differenceInDays < 365 * 2) {
      return '1 year ago';
    } else {
      return `${Math.floor(differenceInDays / 365)} years ago`;
    }
  };
  

  return (
    <div className='open-main'>
    <Navbar />
      <div className='open-card-main'>
      <div className='card-image-div'>
      <img className='imageCard' src={data.imageUrl} />
      </div>
      <div style={{width: 610, height: 250,marginTop: 30, borderRadius: 5, border: '1px solid lightgrey'}}>
        <h1 className='price'>{"Rs " + data.price}</h1>
        <p className='description-card'>{data.description}</p>
        <p className='condition-card'>{'Condition ' + data.condition}</p>
        <div className='location-card'>
        <img style={{width: 18, height: 18}} src={locationImage} alt="location" />
        <p>{data.location}</p>
        <p style={{position: 'relative', top: 10, left: 320}}>{getTimeDifference(data.createdAt)}</p>
        </div>
        </div>
        <div className='contact-card-div'>
      {!showPhoneNumber ? (
    
        <span onClick={showNumber} id='contact-card-button'>
        <img style={{width: 18, height: 18, position: 'relative', left: -10, top: 3}} src={phoneImage} alt="telephone" />
          Show Phone Number
        </span>
      ) : (
        <p id='contact-card-number'><img style={{width: 20, height: 20, position: 'relative', left: -10, top: 5}} src={phoneImage} alt="telephone" />{'+92 ' + data.phone}</p>
      )}
      <span id='chat-card-button' ><img src={chatImage} style={{width: 20, height: 20, fontWeight: 'bold', position: 'relative', left: -10, top: 5}} alt="chat" />Chat</span>
    </div>
    <div className='location-seprate'>
    <img style={{width: 18, height: 18, marginLeft: -70}} src={locationImage} alt="location" />
        <p>{data.location}</p>
    </div>
      </div>
        <Footer />
    </div>
  );
};

export default OpenCard;
