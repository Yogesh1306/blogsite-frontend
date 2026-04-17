import { NavLink, useParams } from "react-router";
import ImageComponent from "../components/ImageComponent";
import PostMenuActions from "../components/PostMenuActions";
import CommentsContainer from "../components/CommentsContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import SearchComponent from "../components/SearchComponent";

const fetchPost = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${slug}`,
  );
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data, status } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  console.log({ data });

  return (
    <>
      {isPending && <div className="py-4 text-center">Loading...</div>}

      {error && (
        <div className="py-4 text-center text-red-600">
          An error has occurred: {error.message}
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-8">
          {/* details */}
          <div className="flex gap-8">
            <div className="lg:w-3/5 flex flex-col gap-8">
              <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
                {data?.item?.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written by</span>
                <NavLink className={"text-blue-800"}>
                  {data?.item?.user?.username}
                </NavLink>
                <span>on</span>
                <NavLink className={"text-blue-800"}>
                  {data?.item?.category}
                </NavLink>
                <span>{format(data?.item.createdAt)}</span>
              </div>
              <p className="text-gray-500 font-medium">{data?.item?.desc}</p>
            </div>
            {data?.item?.coverImg && (
              <div className="hidden lg:block w-2/5 rounded-2xl border overflow-hidden">
                <ImageComponent
                  src={data?.item?.coverImg}
                  classname="h-65 object-cover "
                  w="600"
                />
              </div>
            )}
          </div>
          {/* content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* text */}
            <div className="lg:text-lg w-full flex flex-col gap-6 text-justify overflow-hidden p-2">
              <div
                className="prose prose-sm max-w-none overflow-x-auto hyphens-auto wrap-break-word leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data?.item?.content || " " }}
              />
            </div>
            {/* menu */}
            <div className="px-4 h-max sticky top-8">
              <h1 className=" mb-4 text-sm font-medium">Author</h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-8">
                  {/* profile img */}
                  {data?.item?.user?.avatar && (
                    <ImageComponent
                      src={data?.item?.user?.avatar}
                      classname={
                        "w-12 h-12 rounded-full object-cover bg-gray-5s00"
                      }
                      w="48"
                      h="48"
                    />
                  )}
                  <NavLink className={"text-blue-800"}>
                    {data?.item?.user?.username}
                  </NavLink>
                </div>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <div className="flex gap-2 items-center justify-start ">
                  {/* facebook logo */}
                  <NavLink>
                    <ImageComponent
                      src={"/facebook.svg"}
                      classname={"w-6 h-6"}
                    />
                  </NavLink>
                  <NavLink>
                    {/* instagram logo */}
                    <ImageComponent
                      src={"/instagram.png"}
                      classname={"w-6 h-6"}
                    />
                  </NavLink>
                </div>
              </div>
              <PostMenuActions post={data} />
              <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
              <div className="flex flex-col gap-2 text-sm">
                <NavLink className={"underline"} to={"posts?cat=general"}>
                  All
                </NavLink>
                <NavLink className={"underline"} to={"/posts?cat=web-design"}>
                  Web Design
                </NavLink>
                <NavLink className={"underline"} to={"/posts?cat=development"}>
                  Development
                </NavLink>
                <NavLink className={"underline"} to={"/posts?cat=development"}>
                  Databases
                </NavLink>
                <NavLink className={"underline"} to={"/posts?cat=development"}>
                  Search Engines
                </NavLink>
                <NavLink className={"underline"} to={"/posts?cat=development"}>
                  Marketing
                </NavLink>
              </div>
              <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
              <SearchComponent />
            </div>
          </div>
          <CommentsContainer postId={data?.item?._id} />
        </div>
      )}
    </>
  );
};

export default SinglePostPage;
