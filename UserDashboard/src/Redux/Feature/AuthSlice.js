import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

// User Signup
export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data.user; // Adjusted to match controller response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

// User Login
export const loginUser = createAsyncThunk("auth/login", async (Credential, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, Credential);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.role);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const authSlice = createSlice({  
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },


  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.role; // Storing role as user data
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
