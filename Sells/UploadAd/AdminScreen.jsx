import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './style.admin.css';
import { useNavigate, useParams } from 'react-router-dom';
import menuDotImg from './assests/dots.png';
import bLikeImg from './assests/love.png';
import alikeImg from './assests/heart.png';
import seeImg from './assests/see.png';
import binImg from './assests/bin.png';
import editImg from './assests/edit.png';
import newImg from './assests/plus.png';


const AdminScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [likeStatus, setLikeStatus] = useState({
    imageSrc1: bLikeImg,
    imageSrc2: bLikeImg,
    imageSrc3: bLikeImg,
    imageSrc4: bLikeImg,
  });

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/olx/api/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAdData(data);
        } else {
          console.error('Failed to fetch ad details');
        }
      } catch (error) {
        console.error('Error fetching ad details:', error);
      }
    };

    if (id) {
      fetchAdDetails();
    }
  }, [id]);

  const updateAd = () => {
    navigate(`/editUploadAd/${id}`)
  }



  const deleteAd = async () => {
    try {
      if (!id) {
        console.error('ID is missing');
        return;
      }
  
      const isConfirmed = window.confirm('Are you sure you want to delete this ad?');
  
      if (isConfirmed) {
        const response = await fetch(`http://localhost:3000/olx/api/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          navigate('/home');
        } else {
          console.error('Failed to delete ad');
        }
      } else {
        console.log('Deletion cancelled');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };
  

  const uploadNewAd = () => {
    navigate(`/uploadAd`)
  }

  const seeAd = () => {
    navigate(`/opencard/${id}`)
  }

  const changeImage = (imageSrc) => {
    setLikeStatus((prevState) => ({
      ...prevState,
      [imageSrc]: prevState[imageSrc] === bLikeImg ? alikeImg : bLikeImg,
    }));
  };

  return (
    <>
      <Navbar />

      <div className='adminScreen-mainDiv'>
        <div className='sidebar'>

          <ul className='sidebarUl'>
            <span className='dashboardHead'>Dashboard</span>
            <li  onClick={seeAd}>See Your Ad <img style={{width: 25, height: 25, position: 'relative', left: 65}} src={seeImg} alt="" /></li>
            <li onClick={updateAd}>Edit Your Ad <img style={{width: 25, height: 25, position: 'relative', left: 65}} src={editImg} alt="" /></li>
            <li  onClick={deleteAd}>Delete Your Ad <img style={{width: 25, height: 25, position: 'relative', left: 50}} src={binImg} alt="" /></li>
            <li onClick={uploadNewAd}>Upload New Ad <img style={{width: 25, height: 25, position: 'relative', left: 45}} src={newImg} alt="" /></li>
          </ul>

        </div>
        <div className='dashboard'> 
          <div className='see-edit'>

            <div className='dashboard-card'>
              <span>See Your Ad</span>
            <img className='menue3dot1' src={menuDotImg} alt="menue" />
              <p className='paragraph'>
                You can view your uploaded ad by clicking <br /> on "See Ad" on the left side  of the <br /> dashboard.
              </p>
              <img className='likeUnlike1' src={likeStatus.imageSrc1} alt='like' onClick={() => changeImage('imageSrc1')} />
            </div>
            <div className='dashboard-card'>
              <span>Edit Your Ad</span>
            <img className='menue3dot1' src={menuDotImg} alt="menue" />

              <p className='paragraph'>
                If you want to upload your ad, click  on the <br /> "Edit Ad" option on the left side  of the dashboard.
              </p>
              <img className='likeUnlike2' src={likeStatus.imageSrc2} alt='like' onClick={() => changeImage('imageSrc2')} />
            </div>
          </div>
          <div className='add-delete'>

            <div className='dashboard-card'>
              <span>Upload New Ad</span>
            <img className='menue3dot2' src={menuDotImg} alt="menue" />
              <p className='paragraph'>
                If you've already uploaded an ad and want <br /> to upload another one, you  can click on <br /> "Upload New Ad" on  the left side of the dashboard.
              </p>
              <img className='likeUnlike3' src={likeStatus.imageSrc3} alt='like' onClick={() => changeImage('imageSrc3')} />
              
            </div>
            <div className='dashboard-card'>
              <span>Delete Your Ad</span>
            <img className='menue3dot2' src={menuDotImg} alt="menue" />
              <p className='paragraph'>
                If you want to delete your ad, you  can click <br /> on "Delete" on the left-hand  side of the dashboard to remove  the ad.
              </p>
              <img className='likeUnlike4' src={likeStatus.imageSrc4} alt='like' onClick={() => changeImage('imageSrc4')} />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminScreen
