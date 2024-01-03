import React, {useEffect} from 'react';
import TVA from '../HomeScreen/TVA/tvaCards.jsx';
import Card from '../HomeScreen/TVA/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectTvaData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const AllTVA = () => {
  const dispatch = useDispatch();
  const tvaData = useSelector(selectTvaData);
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
    fontSize: '16px'
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
        {tvaData &&
          tvaData.map((tva, index) => (
            <div key={tva.id}  onClick={() => showData(tva._id)}
             style={singleStyle}>
              <Card
                imageUrl={tva.imageUrl}
                price={"Rs " +tva.price}
                description={tva.description}
                // phone={tva.phone}
                location={tva.location}
                condition={getTimeDifference(tva.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTVA;

