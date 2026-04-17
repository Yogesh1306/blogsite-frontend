import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent";
import { NavLink } from "react-router";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {

  return (
    <div className="flex flex-col xl:flex-row gap-4 mb-8">
      {/* image */}
      {post.coverImg && (
        <div className="md:hidden xl:block xl:w-1/3 ">
          <ImageComponent
            src={post?.coverImg}
            classname="w-full h-100 md:h-50 rounded-3xl object-cover"
            w="735"
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-3 xl:w-2/3">
        {/* title */}
        <NavLink
          to={`/post/${post?.slug}`}
          className={"text-4xl font-semibold"}
        >
          {post.title}
        </NavLink>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <NavLink
            to={`/posts?author=${post?.user?.username}`}
            className={"text-blue-600"}
          >
            {post?.user?.username}
          </NavLink>
          <span>on</span>
          <NavLink to={"/test"} className={"text-blue-600"}>
            {post?.category}
          </NavLink>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <NavLink
          to={`/post/${post?.slug}`}
          className={"underline text-blue-800 text-sm"}
        >
          Read more
        </NavLink>
      </div>
    </div>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
      _id: PropTypes.string,
      slug: PropTypes.string.isRequired,
      isFeatured: PropTypes.bool,
      title:PropTypes.string.isRequired,
      desc: PropTypes.string,
      createdAt: PropTypes.string,
      category: PropTypes.string,
      coverImg:PropTypes.string,
      user: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string
      }).isRequired,
  }),
};

export default PostListItem;
