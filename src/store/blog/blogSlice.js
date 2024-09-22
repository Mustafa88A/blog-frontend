import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  blog: null,
  error: "",
  loading: false,
  create: { loading: false, data: null, error: null },
};

export const blogPost = createAsyncThunk("blog/blogPost", async (post) => {
  try {
    const res = await axios.get("http://localhost:7500/blog", post);
    const data = res.data;
    // console.log("from slice", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});
export const blogByCategory = createAsyncThunk(
  "blog/blogByCategory",
  async (id) => {
    try {
      const res = await axios.post("http://localhost:7500/blog/category/", id);
      const data = res.data;
      // console.log("from slice", data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "blog/createNewPost",
  async ({ post, token }) => {
    console.log("999", token);
    try {
      const formData = new FormData();
      const { title, introduction, content, image, category } = post;
      formData.append("title", title);
      formData.append("introduction", introduction);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);
      const res = await axios.post("http://localhost:7500/blog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  "blog/updateBlogPost",
  async (post) => {
    try {
      const res = await axios.put(
        `http://localhost:7500/blog/${post.id}`,
        post
      );
      console.log(res + "updateBlogPost");
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(blogPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(blogPost.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(blogPost.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
    //fetch  blogByCategory
    builder.addCase(blogByCategory.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(blogByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.blog = action.payload;
      state.error = null;
    });
    builder.addCase(blogByCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    //fetch createNewPost
    builder.addCase(createNewPost.pending, (state, action) => {
      state.create.loading = true;
      state.create.error = null;
    });
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.data = action.payload;
      state.create.error = null;
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.create.loading = false;
      state.create.error = action.payload || action.error.message;
    });
    //update Blog Post
    builder.addCase(updateBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateBlogPost.fulfilled, (state, action) => {
      console.log("Action payload:", action.payload); // تحقق من محتويات payload
      state.loading = false;
      if (action.payload) {
        const index = state.data.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      } else {
        console.error("No payload found");
      }
    });

    builder.addCase(updateBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
  },
});

export default blogSlice.reducer;
