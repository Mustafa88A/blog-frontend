import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSignUp } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.data);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newImage, setNewImage] = useState("");

  const signUp = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const userInfo = {
      userName: newUsername,
      password: newPassword,
      email: newEmail,
      fullName: newFullName,
      image: newImage,
    };

    dispatch(fetchUserSignUp(userInfo));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=" bg-[#4B5563]">
      <form
        onSubmit={signUp}
        action=""
        className="flex flex-col w-[100%] justify-center items-center gap-4 h-[90vh] md:h-[100vh]"
      >
        <input
          type="text"
          placeholder="username"
          className="w-[70%] h-9 rounded-md  md:w-72 p-2"
          // value={fullName}
          onChange={(e) => {
            setNewFullName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="fullname"
          className="w-[70%] h-9 rounded-md  md:w-72 p-2"
          // value={userName}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="E-mail"
          className="w-[70%] h-9 rounded-md  md:w-72 p-2"
          // value={email}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="w-[70%] h-9 rounded-md  md:w-72 p-2"
          // value={password}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files)}
        />
        <button
          type="submit"
          className="text-white border-2 w-[70%] h-9 rounded-md md:w-72"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Register;
