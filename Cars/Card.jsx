import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const Card = (props) => {
  const { imageUrl, description, location, price, condition, _id } = props; // Destructure the props
  // const {id} = useParams()
  // const navigate = useNavigate();

  // const openCard = () => {
  //   navigate(`/opencard/${id}`);
  // };
 
  
  const mainStyle = {
    width: '100%',
    height: '430px', // Updated height to 500px
    display: 'flex', // Use flexbox to control inner elements
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    padding: '10px', // Add padding for spacing
  };

  const cardStyle = {
    width: '100%',
    height: '70%', // Adjusted size relative to the main container
    display: 'flex',
    flexDirection: 'column', // Stack the inner elements vertically
    borderRadius: '10px', // Added border radius for card
  };

  const innerCardStyle = {
    flex: '1', // Make the inner card take up remaining space
    overflow: 'hidden',
    // backgroundColor: 'green',
    border: '1px solid pink',
    borderRadius: '10px', // Added border radius for inner card
    display: 'flex',
    flexDirection: 'column', // Stack the inner content vertically
    justifyContent: 'space-around', // Distribute inner content evenly
  };

  const priceStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    marginLeft: '16px',
    
  };

  const descriptionStyle = {
    fontSize: '16px',
    marginBottom: '10px',
    marginLeft: '16px',
    
  };

  const locationStyle = {
    fontSize: '14px',
    marginLeft: '16px',

  };
  const idStyle = {
    fontSize: 10
  }
  const conditionStyle = {
    fontSize: '12px',
    marginLeft: '16px',

  };


  return (
    <div style={mainStyle}>
      <div style={cardStyle}>
        <div style={innerCardStyle}>
          <img src={imageUrl} alt="" style={{ width: '100%', height: '50%', marginTop: '-15px' }} />
          <p style={priceStyle}>{price}</p>
          <span style={descriptionStyle}>{description}</span>
          <p style={locationStyle}>{location}</p>
          <p style={conditionStyle}>{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;


