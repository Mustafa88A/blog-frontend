import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    try {
      const res = await axios.get("http://localhost:7500/category");
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:7500/blog?category/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
const initialState = {
  get: {
    loading: false,
    data: [],
    error: null,
    oneCategory: [],
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.get.loading = true;
        state.get.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.get.loading = false;
        state.get.data = action.payload;
        state.get.error = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.get.loading = false;
        state.get.error = action.error.message;
      })
      .addCase(getOneCategory.pending, (state) => {
        state.oneCategory = null;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.oneCategory = action.payload;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.oneCategory = null;
        state.error = action.payload.message;
      });
  },
});

export default categorySlice.reducer;
