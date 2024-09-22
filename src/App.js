import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch } from "react-redux";
import { blogPost, updateBlogPost } from "./store/blog/blogSlice";
import { useEffect } from "react";
import CardOne from "./page/CardOne";
import BlogPost from "./components/BlogPost";
import { getCategory } from "./store/category/categorySlice";
import AllCategory from "./page/AllCategory";
import Category from "./page/Category";
import { setLogin } from "./store/user/userSlice";
import DashBoard from "./page/DashBoard";
import UserAccount from "./components/UserAccount";
import NewArticle from "./page/NewArticle";
import EditPost from "./components/EditPost";
/*

*/
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogPost());
    // dispatch(getUser());
    // dispatch(getComments());
    dispatch(getCategory());
    dispatch(setLogin());
  });
  return (
    <div className=" bg-[#4B5563]">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}>
          blog
        </Route>
        <Route path="/Login" element={<Login />}>
          Login
        </Route>
        <Route path="/Register" element={<Register />}>
          Register
        </Route>
        <Route path="/blogs" element={<BlogPost />}>
          blog
        </Route>
        <Route path="/category" element={<AllCategory />}>
          category
        </Route>
        <Route path="/dashboard" element={<DashBoard />}>
          category
        </Route>

        <Route path="/profile" element={<UserAccount />} />
        <Route path="/blog/:_id" element={<CardOne />} />
        <Route path="/newarticle" element={<NewArticle />} />
        {/* <Route path="/login/dash" element={<CardOne />} /> */}
        <Route path="/categories/:_id" element={<Category />} />
        <Route path="/blogs/:_id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
