import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/driver";

// Async thunk for adding a driver
export const addDriver = createAsyncThunk("driver/addDriver", async (driverData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/adddriver`, driverData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for fetching all drivers
export const getAllDriver = createAsyncThunk("driver/getAllDriver", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/getAllDriver`); // Removed driverData
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers.push(action.payload.driver);
      })
      .addCase(addDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload.drivers; // Updated state with fetched drivers
      })
      .addCase(getAllDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default driverSlice.reducer;
