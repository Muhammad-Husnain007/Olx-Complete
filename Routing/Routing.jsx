import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../Rejistration/Signup.jsx'; // Assuming this is the correct path to your Signup component
import Signin from '../Rejistration/Signin.jsx';
import Homescreen from '../Components/HomeScreen/AllScreensimp/Homescreen.jsx';
import UserAds from '../Sells/UploadAd/UserAds.jsx';

import AllMobilePhones from '../Components/MobilePhoneScreen/AllMobilePhones.jsx';
import CarsScreen from '../Components/CarsScreen/CarsAll.jsx';
import HouseScreen from '../Components/HouseScreen/AllHouses.jsx';
import TabletsScreen from '../Components/TabletsScreen/AllTablets.jsx';
import MotorcycleScreen from '../Components/MotorcycleScreen/AllBikes.jsx';
import LandsPlotsScreen from '../Components/LandsPlotsScreen/AllPlots.jsx';
import TvVideoAudioScreen from '../Components/TvVideoAudioScreen/AllTVA.jsx';
import OpenCard from '../Components/AllScreensOpenCars/OpenCard.jsx';
import AdminScreen from '../Sells/UploadAd/AdminScreen.jsx';
import EditUploadAd from '../Sells/UploadAd/EditUploadAd.jsx';



const Routing = () => {
  return (
    <Router>
      <Routes>

      {/* ========== Rejistration Route ======= */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

      {/* ========== HomeScreen Route ======= */}

        <Route path="/home" element={<Homescreen />} />
        {/* Add more routes here as needed */}
        <Route path='/uploadAd' element={<UserAds />} />
        <Route path='/editUploadAd/:id' element={<EditUploadAd />} />
        <Route path='/mobilePhones' element={<AllMobilePhones />} />
        <Route path='/cars' element={<CarsScreen />} />
        <Route path='/opencard/:id' element={<OpenCard />} />
        <Route path='/tv_video_audio' element={<TvVideoAudioScreen />} />
        <Route path='/houses' element={<HouseScreen />} />
        <Route path='/lands_plots' element={<LandsPlotsScreen />} />
        <Route path='/bikes_motorcycle' element={<MotorcycleScreen />} />
        <Route path='/tablets' element={<TabletsScreen />} />

      {/* ====== Go Admin ====== */}
      <Route path='/uploadAd/adminScreen/:id' element={<AdminScreen />} />
      
      </Routes>
    </Router>
  );
};

export default Routing;

