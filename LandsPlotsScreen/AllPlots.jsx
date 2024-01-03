import React, {useEffect} from 'react'
import Plot from '../HomeScreen/Plot/plotsCards.jsx'
import Card from '../HomeScreen/Plot/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectPlotsData } from '../../Sells/redux/Slice.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const AllPlots = () => {
  const dispatch = useDispatch();
  const plotData = useSelector(selectPlotsData);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchData());
  }, [id]);

  const showData = (id) => {
    navigate(`/opencard/${id}`);
  };

  const plotContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    justifyContent: 'flex-start',

  };

  const singleplotStyle = {
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
      <div style={plotContainerStyle}>
        {plotData &&
          plotData.map((plot, index) => (
            <div key={plot.id}  onClick={() => showData(plot._id)}
            style={singleplotStyle}>
              <Card
                imageUrl={plot.imageUrl}
                price={"Rs " + plot.price}
                description={plot.description}
                // phone={plot.phone}
                location={plot.location}
                condition={getTimeDifference(plot.createdAt)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllPlots
