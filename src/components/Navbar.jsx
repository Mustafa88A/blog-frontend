import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import DashBoard from "../page/DashBoard";
function Navbar() {
  const islogeed = useSelector((state) => state.user.isLogged);

  // console.log(islogeed);
  function handleProfile() {
    <DashBoard />;
  }
  return (
    <div className="flex justify-center text-white ">
      <div className="flex justify-between items-center w-[90%] h-14  ">
        <div className="ml-5 ">
          <Link to={"/"}>blog</Link>
        </div>
        <div className="-500 flex justify-evenly w-[35%]">
          <Link to="/blogs">Home</Link>
          <Link to="/category">category</Link>
          {/* <Link to={"/dashboard"}>dashboard </Link> */}
        </div>
        <div className="w-[40%] flex justify-around md:w-[15%]  md:justify-around ">
          {islogeed ? (
            <div>
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
          ) : (
            <Link to="/Login">Login</Link>
          )}
          <Link to="/Register">Register </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
