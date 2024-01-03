import React, {useEffect} from 'react';
import Card from './Card.jsx';
import './style.card.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectCarsData } from '../../../Sells/redux/Slice.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const carsCards = () => {
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
    <>
    <span className='spanCar'>Cars</span>
    <div className='car-cards-row'>
      {carData &&
        carData.slice(0, 4).map((car, index) => ( // Limit to 4 cards only
          <div key={car.id} onClick={() => showData(car._id)} className='car-card'>
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
    </>
  );
  
};


export default carsCards;
