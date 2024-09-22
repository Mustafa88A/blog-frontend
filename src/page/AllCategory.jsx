import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllCategory() {
  const category = useSelector((state) => state.category.get.data);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    });
  }, []);
  return (
    <div className="h-[100vh] text-white flex justify-center pt-7 ">
      {loading ? (
        "Loading ...."
      ) : (
        <div className="w-[90%]   flex justify-center md:justify-around md:items-center">
          {category?.map((oneCategory, index) => (
            <div
              key={index}
              onClick={() => navigate(`/categories/${oneCategory._id}`)}
              className=" cursor-pointer border-2 w-60 h-72 flex flex-col-reverse justify-around md:w-[20%] md:h-[42%] "
            >
              <h1 className="pl-5 font-bold">{oneCategory.name}</h1>
              <div className="flex justify-center">
                <img
                  className="h-56 w-[90%]"
                  src={`http://localhost:7500/${oneCategory.image}`}
                  alt="image"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCategory;
