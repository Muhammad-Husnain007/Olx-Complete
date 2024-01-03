import React, {useEffect} from 'react'
import Houses from '../HomeScreen/Houses/housesCards.jsx'
import Card from '../HomeScreen/Houses/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectHousesData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const AllHouses = () => {
  const dispatch = useDispatch();
  const housesData = useSelector(selectHousesData);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const housesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'flex-start',

  };

  const singlehousesStyle = {
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
      <div style={housesContainerStyle}>
        {housesData &&
          housesData.map((houses, index) => (
            <div key={houses.id}  onClick={() => showData(houses._id)}
            style={singlehousesStyle}>
              <Card
                imageUrl={houses.imageUrl}
                price={"Rs " +houses.price}
                description={houses.description}
                // phone={houses.phone}
                location={houses.location}
                condition={getTimeDifference(houses.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllHouses
