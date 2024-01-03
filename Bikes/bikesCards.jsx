import React, {useEffect} from 'react';
import Card from './Card.jsx';
import './style.bike.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectBikesData } from '../../../Sells/redux/Slice.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const bikesCards = () => {
  const dispatch = useDispatch();
  const bikesData = useSelector(selectBikesData);
  const navigate = useNavigate();
  // const [data, setData] = useState([])
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
    <span className='bike-span'>Bikes & Motorcycles</span>
  <div className='bike-cards-row'>
      {bikesData &&
        bikesData.slice(0, 4).map((bikes, index) => ( // Limit to 4 cards only
          <div key={bikes.id} onClick={() => showData(bikes._id)} className='bike-card'>
            <Card
              imageUrl={bikes.imageUrl}
              price={"Rs " + bikes.price}
              description={bikes.description}
              location={bikes.location}
              condition={getTimeDifference(bikes.createdAt)}
            />
          </div>
        ))}
    </div>
    </>
  );
  
};

export default bikesCards;
