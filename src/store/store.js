import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import blogSlice from "./blog/blogSlice";
import commentsSlice from "./comments/commentsSlice";
import categorySlice from "./category/categorySlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
    comment: commentsSlice,
    category: categorySlice,
  },
});

export default store;
