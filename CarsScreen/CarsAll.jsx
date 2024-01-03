import React, { useEffect, useState } from 'react';
import Cars from '../HomeScreen/Cars/carsCards.jsx';
import Card from '../HomeScreen/Cars/Card.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectCarsData } from '../../Sells/redux/Slice.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CarsAll = () => {
  const dispatch = useDispatch();
  const carData = useSelector(selectCarsData);
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  };

  const singleCardStyle = {
    width: '25%',
    marginBottom: '20px',
    cursor: 'pointer', // Add cursor pointer to indicate clickable elements
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
    <div>
      <div style={cardContainerStyle}>
        {carData &&
          carData.map((car, index) => (
            <div
             key= {car.id} onClick={() => showData(car._id)} // Pass the card ID to the function
             style={singleCardStyle}
            >
              <Card
                imageUrl={car.imageUrl}
                price={"Rs " + car.price}
                description={car.description}
                location={car.location}
                condition={getTimeDifference(car.createdAt)}
                
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarsAll;
