import { NavLink } from "react-router";
import ImageComponent from "./ImageComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchFeaturedPosts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/posts?featured=true&limit=4&sort=newest`,
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data, status } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchFeaturedPosts(),
  });

  const featuredPosts = data?.items;
  if (!featuredPosts || featuredPosts.length === 0) return;

  return (
    <>
      {isPending && <div className="py-4 text-center">Loading...</div>}

      {error && (
        <div className="py-4 text-center text-red-600">
          An error has occurred: {error.message}
        </div>
      )}
      {status === "success" && (
        <div className="mt-8 flex flex-col lg:flex-row gap-8 ">
          {/* first post */}
          {featuredPosts[0] && (
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              {/* image */}
              {featuredPosts[0]?.coverImg && (
                <ImageComponent
                  src={featuredPosts[0]?.coverImg}
                  classname="rounded-3xl object-cover w-full md:w-170"
                  w="895"
                />
              )}
              {/* details */}
              <div className="flex items-center gap-4">
                <h1 className="font-semibold lg:text-lg ">01.</h1>
                <NavLink
                  to={`/posts?cat=${featuredPosts?.category}`}
                  className={"text-blue-800 lg:text-lg"}
                >
                  {featuredPosts[0]?.category}
                </NavLink>
                <span className="text-gray-500">
                  {format(featuredPosts[0]?.createdAt)}
                </span>
              </div>
              {/* title */}
              <NavLink
                to={`/post/${featuredPosts[0]?.slug}`}
                className={"text-xl lg:text-2xl font-semibold lg:font-bold "}
              >
                {featuredPosts[0].title}
              </NavLink>
            </div>
          )}
          {/* other posts */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* second */}
            {featuredPosts[1] && (
              <div className="lg:h-1/3  flex justify-between  gap-4">
                <div className="w-1/3">
                  {featuredPosts[1]?.coverImg && (
                    <ImageComponent
                      src={featuredPosts[1]?.coverImg}
                      classname="rounded-3xl object-cover w-full aspect-video md:w-170"
                      w="895"
                    />
                  )}
                </div>
                {/* details and title */}
                <div className="w-2/3 ">
                  {/* details */}
                  <div className="w-full  flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">02.</h1>
                    <NavLink
                      to={`/posts?cat=${featuredPosts[1]?.category}`}
                      className="text-blue-800"
                    >
                      {featuredPosts[1]?.category}
                    </NavLink>
                    <span className="text-gray-500 text-sm">
                      {format(featuredPosts[1]?.createdAt)}
                    </span>
                  </div>
                  {/* title */}
                  <NavLink
                    to={`/post/${featuredPosts[1]?.slug}`}
                    className="text-base sm:text-lg md:text-xl  font-medium"
                  >
                    {featuredPosts[1]?.title}
                  </NavLink>
                </div>
              </div>
            )}

            {/* third */}
            {featuredPosts[2] && (
              <div className="lg:h-1/3 flex justify-between  gap-4">
                <div className="w-1/3  ">
                  {featuredPosts[2]?.coverImg && (
                    <ImageComponent
                      src={featuredPosts[2]?.coverImg}
                      classname="rounded-3xl object-cover w-full aspect-video md:w-170"
                      w="895"
                    />
                  )}
                </div>
                {/* details and title */}
                <div className="w-2/3">
                  {/* details */}
                  <div className="w-full flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">03.</h1>
                    <NavLink
                      to={`/posts?cat=${featuredPosts[2]?.category}`}
                      className="text-blue-800"
                    >
                      {featuredPosts[2]?.category}
                    </NavLink>
                    <span className="text-gray-500 text-sm">
                      {format(featuredPosts[2].createdAt)}
                    </span>
                  </div>
                  {/* title */}
                  <NavLink
                    to={`/post/${featuredPosts[2]?.slug}`}
                    className="text-base sm:text-lg md:text-xl  font-medium"
                  >
                    {featuredPosts[2]?.title}
                  </NavLink>
                </div>
              </div>
            )}
            {/* fourth */}
            {featuredPosts[3] && (
              <div className="lg:h-1/3 flex justify-between  gap-4">
                <div className="w-1/3  ">
                  {featuredPosts[3]?.coverImg && (
                    <ImageComponent
                      src={featuredPosts[3]?.coverImg}
                      classname="rounded-3xl object-cover w-full aspect-video md:w-170"
                      w="895"
                    />
                  )}
                </div>
                {/* details and title */}
                <div className="w-2/3">
                  {/* details */}
                  <div className="w-full flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">04.</h1>
                    <NavLink
                      to={`/posts?cat=${featuredPosts[3]?.category}`}
                      className="text-blue-800"
                    >
                      {featuredPosts[3]?.category}
                    </NavLink>
                    <span className="text-gray-500 text-sm">
                      {format(featuredPosts[3].createdAt)}
                    </span>
                  </div>
                  {/* title */}
                  <NavLink
                    to={`/post/${featuredPosts[3]?.slug}`}
                    className="text-base sm:text-lg md:text-xl  font-medium"
                  >
                    {featuredPosts[3]?.title}
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedPosts;
