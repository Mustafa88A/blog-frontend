import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import userimg from "../components/user.png";
import Logout from "../components/Logout";

function DashBoard() {
  // const { _id } = useParams();
  const user = useSelector((state) => state.user.data);

  console.log("user", user);

  return (
    <div className="bg-[#4B5563] h-[100vh] text-white">
      <div className="p-7 md:pl-20 md:pt-14 h-[60%] flex flex-col gap-10 md:gap-20">
        <div className="w-10  border-[50%] ">
          <img src={userimg} alt="" />
        </div>
        <NavLink to={"/profile"} className=" w-36 h-7">
          <p className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            User account{" "}
          </p>
        </NavLink>
        <NavLink className=" w-36 h-7" to={"/newarticle"}>
          <p className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            New Article{" "}
          </p>
        </NavLink>
        <Logout />
      </div>
    </div>
  );
}

export default DashBoard;
