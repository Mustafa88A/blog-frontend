import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { useParams } from "react-router-dom";

function UserAccount() {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user.data);
  console.log("profile", profile);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data if it doesn't exist
    if (!user) {
      // const { userId } = useParams();
      dispatch(getUser());
    } else {
      setProfile(user);
    }
  }, [user, dispatch]);

  if (!user) {
    return <h1>loading ...</h1>;
  }

  return (
    <div className="h-[100vh] bg-[#4B5563] flex items-center justify-center">
      {profile && (
        <div>
          <div className="bg-[#012b66c1] w-80 h-[65vh] flex flex-col justify-around md:w-[450px] md:h-[70vh] ">
            <div className=" flex flex-col items-center pt-4  rounded-2xl">
              <img
                className="rounded-[50%] w-44 h-44 object-cover "
                src={`http://localhost:7500/${profile.image}`}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center  ">
              <div className="text-white w-[80%] flex flex-col gap-7  ">
                <h1 className="border-2 h-7 rounded-2xl text-center border-black  bg-black  md:h-9">
                  {profile.fullName}
                </h1>
                <h1 className="border-2 h-7 rounded-2xl text-center border-black    bg-black md:h-9">
                  {profile.userName}
                </h1>

                <h1 className="border-2 h-7 rounded-2xl text-center border-black  bg-black  md:h-9">
                  {profile.email}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccount;
