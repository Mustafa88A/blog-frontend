// components/Category.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogByCategory } from "../store/blog/blogSlice";

const Category = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blog.blog);
  console.log("blog", blog);

  const category = useSelector((state) => state.category.get.data);
  // console.log("14414", category);

  useEffect(() => {
    dispatch(blogByCategory({ id: _id }));
  }, [dispatch, _id]);

  return (
    <div className=" flex flex-col justify-center   bg-[#4B5563] md:flex-row md:justify-evenly md:h-[100vh] items-center ">
      {blog?.map((post, _id) => (
        <div
          key={_id}
          className="flex p-4 gap-4 cursor-pointer md:w-[25%] md:h-[78%] "
          onClick={() => navigate(`/blog/${post._id}`)}
        >
          <div className="max-w-sm bg-[#4B5563] border  border-gray-200 rounded-lg shadow ">
            <div className=" pt-2 flex items-center justify-center  ">
              <img
                className="rounded-t-lg  w-[90%] "
                src={`http://localhost:7500/${post.image}`}
                alt=""
              />
            </div>
            <div className="p-5">
              <h6 className="mb-2 text-sm font-bold tracking-tight text-white ">
                {`name ${post.user.userName} : ${post.time}`}
              </h6>
              <h1 className="mb-2  font-bold tracking-tight text-white ">
                {post.title}
              </h1>

              <p className="mb-3 font-normal text-white ">{post.content}</p>
              <p className="mb-3 font-normal text-white ">
                {post.introduction}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
