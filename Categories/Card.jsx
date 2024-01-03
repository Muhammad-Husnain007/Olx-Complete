import React from 'react';

const Card = (props) => {
  const { imageSrc, spanText } = props; // Destructure the props

  const cardStyle = {
    width: '100%',
    height: '280px',
    display: 'flex',
    justifyContent: 'space-around'
  };

  const innerCardStyle = {
    width: '115px',
    height: '156px',
    position: 'relative',
    top: '20px',
    overflowY: 'hidden',
   
  };

  const spanStyle = {
    position: 'relative',
    left: '30px',
    top: '10px',
  };

  return (
    <div style={cardStyle}>
      <div style={innerCardStyle}>
        <img src={imageSrc} alt="" style={{ width: '93px', height: '93px', margin: '10px' }}  /> {/* Use the provided image source */}
        <span style={spanStyle}>{spanText}</span> {/* Use the provided text */}
      </div>
    </div>
  );
};

export default Card;


