import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

const initialState = {
  items: [],
  isLoading: false,
  total: 0,
  totalPage: 0,
  sliders: [],
};

// fetch all product
export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (value) => {
    try {
      const response = await productApi.getProducts(value);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

// fetch Product slide
export const fetchProductSlide = createAsyncThunk(
  "product/fetchProductSlide",
  async () => {
    try {
      const response = await productApi.getProductSlide();
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload.products;
      state.total = action.payload.total;
      state.totalPage = action.payload.totalPage;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.total = 0;
    });

    builder.addCase(fetchProductSlide.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductSlide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sliders = action.payload;
    });
    builder.addCase(fetchProductSlide.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
