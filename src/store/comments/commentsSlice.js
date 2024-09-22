import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // get: { loading: false, data: null, error: null },
  loading: false,
  comment: null,
  error: null,
  newComment: null,
};

export const getComments = createAsyncThunk("comment/getComments", async () => {
  try {
    const res = await axios.get("http://localhost:7500/comment");
    const data = res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ newInfoComment, token }) => {
    try {
      const res = await axios.post(
        "http://localhost:7500/comment",
        newInfoComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log("data", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.comment = null;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
        state.error = null;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.comment = null;
        state.error = action.error.message;
      })
      //fetch Create
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.newComment = null;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.newComment = action.payload;
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.newComment = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export default commentSlice.reducer;
