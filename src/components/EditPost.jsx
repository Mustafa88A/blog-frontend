import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogPost, updateBlogPost } from "../store/blog/blogSlice";

function EditPost() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    _id: _id,
    title: "",
    introduction: "",
    content: "",
  });
  console.log(values, "values");

  // جلب بيانات المنشور
  useEffect(() => {
    dispatch(blogPost(_id)).then((response) => {
      if (response.payload) {
        setValues({
          _id: response.payload._id,
          title: response.payload.title,
          introduction: response.payload.introduction,
          content: response.payload.content,
        });
      }
    });
  }, [dispatch, _id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlogPost(values)).then(() => {
      navigate(`/blogs/${_id}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 text-black">
        <input
          type="text"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <textarea
          type="text"
          value={values.introduction}
          onChange={(e) =>
            setValues({ ...values, introduction: e.target.value })
          }
        />
        <textarea
          type="text"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
        />
        <button type="submit">Update Post</button>
      </div>
    </form>
  );
}

export default EditPost;
