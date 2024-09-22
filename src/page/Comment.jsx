import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../store/comments/commentsSlice";
import { useNavigate } from "react-router-dom";

function Comment({ _id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("_id", _id);

  const allComment = useSelector((state) => state.comment.comment);

  const isLogged = useSelector((state) => state?.user?.isLogged);
  const filterComment = allComment?.filter((com) => com.blog === _id);

  const [newComment, setNewComment] = useState("");
  const newInfoComment = { comment: newComment, blog: _id };
  const token =
    localStorage.getItem("Token") || sessionStorage.getItem("Token");

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleNweComment = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (newComment === "") {
      function not() {
        alert("input is empty");
      }
    } else {
      dispatch(createComment({ newInfoComment, token }));
      if (token && newComment.trim()) {
        dispatch(getComments());
      }
      setNewComment(""); // Clear the input after submission
    }
  };

  return (
    <div className="bg-teal-500 h-auto w-full text-black p-4">
      {filterComment?.map((com, index) => (
        <div key={index} className="my-2 p-2 bg-white rounded-lg">
          <h1>{`Username: ${com?.user?.userName}`}</h1>
          <p>{com?.comment}</p>
        </div>
      ))}
      <div className="flex flex-col mt-4">
        {isLogged ? (
          <form onSubmit={handleNweComment} className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <textarea
                onChange={(e) => setNewComment(e.target.value)}
                // value={newComment}
                className="resize-none rounded-lg w-full p-2 bg-secondary placeholder-primary"
                rows={2}
                placeholder="Add a comment..."
                name="comment"
                id="comment"
              />
            </div>
            <button
              type="submit"
              className="self-end bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </form>
        ) : (
          <p
            onClick={() => navigate("/Login")}
            className="text-red-500 hover:underline cursor-pointer font-semibold"
          >
            Go to login
          </p>
        )}
      </div>
    </div>
  );
}

export default Comment;
