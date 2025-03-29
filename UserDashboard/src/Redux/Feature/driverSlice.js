import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/driver";

// ✅ Add Driver
export const addDriver = createAsyncThunk(
  "driver/addDriver",
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/adddriver`, driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add driver");
    }
  }
);

// ✅ Get All Drivers
export const getAllDriver = createAsyncThunk(
  "driver/getAllDriver",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllDriver`);
      return response.data.drivers || []; // Ensuring we always return an array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch drivers");
    }
  }
);

// ✅ Update Driver
export const updateDriver = createAsyncThunk(
  "driver/updateDriver",
  async ({ _id, driverData }, { rejectWithValue }) => {
    try {
      if (!_id) {
        console.error("Error: Driver ID is undefined!");
        return rejectWithValue("Driver ID is required");
      }

      console.log("Updating driver with ID:", _id);
      const response = await axios.put(`${API_URL}/update/${_id}`, driverData);
      return response.data;
    } catch (error) {
      console.error("Error Updating Driver:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to update driver");
    }
  }
);


// ✅ Redux Slice
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
      // ✅ Add Driver Cases
      .addCase(addDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDriver.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.drivers.push(action.payload.driver);
        }
      })
      .addCase(addDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })

      // ✅ Get All Drivers Cases
      .addCase(getAllDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(getAllDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })

      // ✅ Update Driver Cases
      .addCase(updateDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = state.drivers.map((driver) =>
          driver._id === action.payload._id ? action.payload : driver
        );
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default driverSlice.reducer;
