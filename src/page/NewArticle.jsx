import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../store/blog/blogSlice";

function NewArticle() {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  console.log("4545", category);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.get.data);
  const token = localStorage.getItem("Token");
  console.log("77777777", token);
  const createBlog = (e) => {
    e.preventDefault();
    if (!title && !introduction && !content && !image && !category)
      return alert("error");
    const post = {
      title,
      introduction,
      content,
      image,
      category,
    };

    dispatch(createNewPost({ post, token }));
    navigate("/");
  };

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={createBlog}>
        <textarea
          name=""
          id=""
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Introduction"
          onChange={(e) => setIntroduction(e.target.value)}
        />
        {/* <textarea
          name=""
          id=""
          placeholder="image"
          onChange={(e) => setImage(e.target.file[0])}
        /> */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <select
          name=""
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => {
            console.log("dwdw", category);
            return (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>

        <button type="submit">add post</button>
      </form>
    </div>
  );
}

export default NewArticle;
