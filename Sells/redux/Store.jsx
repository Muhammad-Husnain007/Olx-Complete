import { configureStore } from '@reduxjs/toolkit';
import {sliceReducer} from './Slice.jsx';

const Store = configureStore({
 reducer: {
    reduxFetch: sliceReducer,
  },
});

export default Store ;
