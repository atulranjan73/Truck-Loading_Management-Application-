import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/warehouse";

// ✅ Async thunk for adding a warehouse
export const addwarehouse = createAsyncThunk(
    "warehouse/addwarehouse",
    async (warehousedata, { rejectWithValue }) => {
        try {
            console.log("Sending Warehouse Data:", warehousedata);
            const response = await axios.post(`${API_URL}/addwarehouse`, warehousedata);
            console.log("Response Data:", response.data);
            return response.data; // ✅ Return response properly
        } catch (error) {
            console.error("Error Adding Warehouse:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to add warehouse");
        }
    }
);

// ✅ Async thunk for fetching all warehouses
export const getAllWarehouse = createAsyncThunk(
  "warehouse/getAllWarehouse",
  async (_, { rejectWithValue }) => {
      try {
          const response = await axios.get(`${API_URL}/getAllWarehouse`);
          console.log("Fetched Warehouses:", response.data);
          
          // ✅ Return only the array of warehouses
          return response.data.warehouses || [];
      } catch (error) {
          console.error("Error fetching warehouses", error.response?.data || error.message);
          return rejectWithValue(error.response?.data || "Failed to fetch warehouses");
      }
  }
);

export const updateWarehouse = createAsyncThunk(
  "warehouse/updateWarehouse",
  async ({ _id, warehousedata }, { rejectWithValue }) => {
      try {
          const response = await axios.put(`${API_URL}/update/${_id}`, warehousedata);
          console.log("Updated Warehouse:", response.data);
          return response.data; // ✅ Return the updated warehouse data
      } catch (error) {
          console.error("Error Updating Warehouse:", error.response?.data || error.message);
          return rejectWithValue(error.response?.data || "Failed to update warehouse");
      }
  }
);


// ✅ Redux Slice
const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: {
        warehouse: [], // ✅ Ensure it's always an array
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Handling Add Warehouse
            .addCase(addwarehouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addwarehouse.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Warehouse added:", action.payload);
                
                if (action.payload) {
                    state.warehouse = [...state.warehouse, action.payload]; // ✅ Safely update state
                }
            })
            .addCase(addwarehouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong while adding warehouse";
            })

            // ✅ Handling Get All Warehouses
            .addCase(getAllWarehouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllWarehouse.fulfilled, (state, action) => {
              state.loading = false;
              console.log("Fetched Warehouses:", action.payload);
              state.warehouse = action.payload; // ✅ Directly store the array
          })
          
            .addCase(getAllWarehouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong while fetching warehouses";
            })
          .addCase(updateWarehouse.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(updateWarehouse.fulfilled, (state, action) => {
              state.loading = false;
              console.log("Updated Warehouse:", action.payload);
          
              // ✅ Find and replace the updated warehouse in the state array
              state.warehouse = state.warehouse.map((wh) =>
                  wh._id === action.payload._id ? action.payload : wh
              );
          })
          .addCase(updateWarehouse.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload || "Something went wrong while updating warehouse";
          });
          
    },
});

export default warehouseSlice.reducer;
