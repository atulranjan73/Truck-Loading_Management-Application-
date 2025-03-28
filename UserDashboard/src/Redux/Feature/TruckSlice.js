import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/truck";

// Fetch trucks
export const fetchTrucks = createAsyncThunk("truck/fetchTrucks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch trucks");
  }
});

// Add truck
export const addTruck = createAsyncThunk("truck/addTruck", async (truckData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/add`, truckData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to add truck");
  }
});

// Delete truck
export const deleteTruck = createAsyncThunk("truck/deleteTruck", async (truckId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${truckId}`);
    return truckId;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to delete truck");
  }
});

// Update truck
export const updateTruck = createAsyncThunk("truck/updateTruck", async (truckData) => {
  const response = await fetch(`/api/truck/update/${truckData._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(truckData),
  });

  if (!response.ok) throw new Error("Failed to update truck");
  return await response.json();
});

const truckSlice = createSlice({
  name: "truck", // Changed to singular to match state.truck in selector
  initialState: {
    trucks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Trucks
      .addCase(fetchTrucks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.loading = false;
        state.trucks = action.payload;
      })
      .addCase(fetchTrucks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Truck
      .addCase(addTruck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTruck.fulfilled, (state, action) => {
        state.loading = false;
        state.trucks.push(action.payload);
      })
      .addCase(addTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Truck
      .addCase(deleteTruck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTruck.fulfilled, (state, action) => {
        state.loading = false;
        state.trucks = state.trucks.filter((truck) => truck._id !== action.payload);
      })
      .addCase(deleteTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Truck
      .addCase(updateTruck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTruck.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.trucks.findIndex((truck) => truck._id === action.payload._id);
        if (index !== -1) {
          state.trucks[index] = action.payload; // Replace the old truck with updated data
        }
      })
      .addCase(updateTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default truckSlice.reducer;