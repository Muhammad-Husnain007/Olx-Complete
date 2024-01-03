import React, {useEffect} from 'react'
import Bikes from '../HomeScreen/Bikes/bikesCards.jsx'
import Card from '../HomeScreen/Bikes/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectBikesData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const AllbikesPhones = () => {
  const dispatch = useDispatch();
  const bikesData = useSelector(selectBikesData);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const bikesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'flex-start',

  };

  const singlebikesStyle = {
    width: '25%',
    marginBottom: '20px',
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
      <div style={bikesContainerStyle}>
        {bikesData &&
          bikesData.map((bikes, index) => (
            <div key={bikes.id}  onClick={() => showData(bikes._id)}
            style={singlebikesStyle}>
              <Card
                imageUrl={bikes.imageUrl}
                price={"Rs " +bikes.price}
                description={bikes.description}
                // phone={bikes.phone}
                location={bikes.location}
                condition={getTimeDifference(bikes.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllbikesPhones
