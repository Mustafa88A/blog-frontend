import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";

function CardOne() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const blog = useSelector((state) => state.blog.data);
  const post = blog?.find((post) => post._id === _id);
  const [edit, setEdit] = useState(false);

  function handleSave() {
    setEdit(false);
  }

  return (
    <div className="flex items-center flex-col gap-5 pt-5 text-white">
      <p className="cursor-pointer" onClick={() => setEdit(true)}>
        {/* edit */}
      </p>
      <div className="border-2 h-96 w-[350px] md:w-[70%] md:h-[60vh] flex items-center justify-center bg-red-400">
        <img
          className=" h-80 md:w-full md:h-full flex items-center "
          src={`http://localhost:7500/${post?.image}`}
          alt=""
        />
      </div>
      {edit ? (
        navigate(`/blogs/${post._id}`)
      ) : (
        <div className="flex flex-col gap-4  md:w-[88%]">
          <h6 className="text-center">{`${post?.title}  ${post?.time}`}</h6>
          <h1 className="text-center">{`username:    ${post?.user.userName} `}</h1>
          <h2 className="text-2xl font-bold">{post?.content}</h2>
          <p className="leading-[50px] ">{post?.introduction}</p>
        </div>
      )}
      <Comment _id={_id} />
    </div>
  );
}

export default CardOne;
