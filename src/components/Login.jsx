import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserSingin } from "../store/user/userSlice";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function login(e) {
    try {
      e.preventDefault();
      dispatch(fetchUserSingin({ userName, password })).then(() => {
        let token = localStorage.getItem("Token");
        if (token) {
          return navigate("/");
        } else {
          alert("Oops something went wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogin() {
    setRedirect(!redirect);
  }

  return (
    <>
      <div className=" bg-[#4B5563]">
        <form
          action=""
          className="flex flex-col w-[100%] justify-center items-center gap-4 h-[90vh] md:h-[100vh]"
          onSubmit={login}
        >
          <input
            type="text"
            placeholder="username"
            className="w-[70%] h-9 rounded-md  md:w-72 p-2"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className="w-[70%] h-9 rounded-md  md:w-72 p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link
            to={"/Register"}
            className=" w-[70%] text-right text-white md:w-72"
          >
            Register
          </Link>
          <button
            onClick={handleLogin}
            className="text-white border-2 w-[70%] h-9 rounded-md md:w-72"
          >
            Login
          </button>
          {/* {!true ? (
           
          ) : (
            <button className="text-white border-2 w-[70%] h-9 rounded-md md:w-72">
              LogOut
            </button>
          )} */}
        </form>
      </div>
    </>
  );
}
export default Login;
