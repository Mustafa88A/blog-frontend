import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
function BlogPost() {
  const blog = useSelector((state) => state.blog.data);
  console.log("blog", blog);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col justify-center flex-wrap   bg-[#4B5563] md:flex-row md:w-[90%] ">
        {blog.map((post, _id) => (
          <div
            key={_id}
            className="flex p-4 gap-8  cursor-pointer md:w-[25%] md:h-[78%] "
            onClick={() => navigate(`/blog/${post._id}`)}
          >
            <div className="max-w-sm bg-[#4B5563] border  border-gray-200 rounded-lg shadow ">
              <div className=" pt-2 flex items-center justify-center  ">
                <img
                  className="rounded-t-lg  w-[90%] "
                  src={`http://localhost:7500/${post.image}`}
                  alt=""
                />
              </div>
              <div className="p-5">
                <h6 className="mb-2 text-sm font-bold tracking-tight text-white ">
                  {`name ${post.user?.userName} : ${post.time}`}
                </h6>
                <h1 className="mb-2  font-bold tracking-tight text-white ">
                  {post.title}
                </h1>

                <p className="mb-3 font-normal text-white ">{post.content}</p>
                <p className="mb-3 font-normal text-white line-clamp-2">
                  {post.introduction}
                </p>
                <p className="text-black">read more</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BlogPost;
