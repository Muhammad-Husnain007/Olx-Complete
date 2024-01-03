import React, {useEffect} from 'react'
import Card from '../HomeScreen/MobliePhones/Card.jsx'
import MobileCard from '../HomeScreen/MobliePhones/MobileCards.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectMobilesData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';


const AllMobilePhones = () => {
  const dispatch = useDispatch();
  const mobileData = useSelector(selectMobilesData);
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const mobileContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'flex-start',

  };

  const singlemobileStyle = {
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
      <div style={mobileContainerStyle}>
        {mobileData &&
          mobileData.map((mobile, index) => (
            <div key={mobile.id}  onClick={() => showData(mobile._id)}
             style={singlemobileStyle}>
              <Card
                imageUrl={mobile.imageUrl}
                price={"Rs " +mobile.price}
                description={mobile.description}
                // phone={mobile.phone}
                location={mobile.location}
                condition={getTimeDifference(mobile.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllMobilePhones
