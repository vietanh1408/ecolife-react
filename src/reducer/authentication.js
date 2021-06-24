import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/auth";

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// login
export const authLogin = createAsyncThunk(
  "authentication/login",
  async (data) => {
    try {
      const response = await authApi.login(data);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

// register
export const authRegister = createAsyncThunk(
  "authentication/register",
  async (data) => {
    try {
      const response = await authApi.register(data);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem(
        "access-token",
        JSON.stringify(action.payload.token)
      );
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data.error;
    });

    builder.addCase(authRegister.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem(
        "access-token",
        JSON.stringify(action.payload.token)
      );
    });

    builder.addCase(authRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data.error;
    });
  },
});

export default authenticationSlice.reducer;