import React, {useEffect} from 'react'
import Tablet from '../HomeScreen/Tablet/tabletsCards.jsx'
import Card from '../HomeScreen/Tablet/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectTabletsData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';


const AllTablets = () => {
  const dispatch = useDispatch();
  const tabletsData = useSelector(selectTabletsData);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const ContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'flex-start',

  };

  const singleStyle = {
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
      <div style={ContainerStyle}>
        {tabletsData &&
          tabletsData.map((tablets, index) => (
            <div key={tablets.id}  onClick={() => showData(tablets._id)}
            style={singleStyle}>
              <Card
                imageUrl={tablets.imageUrl}
                price={"Rs " +tablets.price}
                description={tablets.description}
                // phone={tablets.phone}
                location={tablets.location}
                condition={getTimeDifference(tablets.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllTablets
