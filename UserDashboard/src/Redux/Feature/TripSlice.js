import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// ✅ Fetch all trips
export const getAllTrips = createAsyncThunk("trips/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/getAllTrips`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Add a new trip
export const addTrip = createAsyncThunk("trips/add", async (tripData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/addTrip`, tripData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Assign a driver to a trip
export const assignTrip = createAsyncThunk("trips/assign", async ({ tripId, driverId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/assignTrip`, { tripId, driverId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Trip Slice
const tripSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(getAllTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.push(action.payload.trip);
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignTrip.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTrip = action.payload.trip;
        state.trips = state.trips.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip));
      })
      .addCase(assignTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tripSlice.reducer;