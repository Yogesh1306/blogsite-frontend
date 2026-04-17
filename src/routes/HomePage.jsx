import { NavLink } from "react-router";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loginSuccess } from "../redux/userSlice";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    const code = params.get("code");
    if (code) {
      globalThis.history.replaceState({}, "", "/");
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/users/exchange`,
          { code },
          { withCredentials: true },
        )
        .then(() => {
          return axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
            withCredentials: true,
          });
        })
        .then((res) => {
          dispatch(loginSuccess(res.data.user));
        })
        .catch(() => {
          toast.error("Google login failed. please try again.");
        });
    }
  }, [dispatch]);

  return (
    <div className="mt-4 flex flex-col gap-4 px-3 md:px-0">
      {/* BREADCRUMB */}
      <div className="flex gap-4  ">
        <NavLink to={"/"}>Home</NavLink>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}
      <div className="flex items-center justify-between  ">
        {/* titles */}
        <div className="">
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
            Discover Ideas, Stories, and Insights
          </h1>
          <p className="mt-5 text-sm md:text-xl md:w-160">
            Read curated blogs and articles from diverse voices, featuring fresh
            perspectives on technology, culture, and everyday life.
          </p>
        </div>
        {/* animated button */}
        <NavLink to={"/write"} className={"hidden md:block relative"}>
          <svg
            viewBox="0 0 200 200"
            width={200}
            height={200}
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="none"
            />

            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />{" "}
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </NavLink>
      </div>
      {/* Categories */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
