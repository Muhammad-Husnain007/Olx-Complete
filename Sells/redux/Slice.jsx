import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await fetch('http://localhost:3000/olx/api');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

const selectCarsData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'car');
  };
  const selectHousesData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'house');
  };
  const selectBikesData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'bike');
  };
  const selectTabletsData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'tablet');
  };
  const selectTvaData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'tva');
  };
  const selectMobilesData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'mobile');
  };
  const selectPlotsData = (state) => {
    const data = state.reduxFetch.data || []; 
    return data.filter((item) => item.title == 'plot');
  };
  
const Slice = createSlice({
  name: 'reduxFetch',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error state on pending
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false; // Reset error state on success
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true; // Set error state on rejection
      });
  },
});

const sliceReducer = Slice.reducer;

export
 { 
  sliceReducer, fetchData, selectHousesData, selectMobilesData, selectBikesData,
  selectTabletsData, selectPlotsData, selectTvaData, selectCarsData 
  };
