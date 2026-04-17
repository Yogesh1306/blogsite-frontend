import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PostMenuActions = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();


  const { isPending, data: savedPosts } = useQuery({
    queryKey: ["savedPosts", currentUser?._id],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/savedPosts`, {
        withCredentials: true,
      });
    },
    enabled: !!currentUser,
  });

  const queryClient = useQueryClient();

  const isAdmin = currentUser?.role === "admin" || false;
  const isSaved =
    savedPosts?.data?.posts.includes((p) => p === post.item._id) || false;
  const isFeatured = post?.item.isFeatured;


  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${post?.item._id}`,
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const saveMutation = useMutation({
    mutationFn: async () => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/save`,
        { postId: post?.item?._id },
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const featureMutation = useMutation({
    mutationFn: async () => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/feature/feature-post`,
        { postId: post?.item?._id },
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post?.item.slug] });
    },
    onError: (error) => {
      toast.error(error.response);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleSave = () => {
    if (!currentUser) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const colorMap = {
    true: { true: "none", false: "black" },
    false: { true: "black", false: "none" },
  };

  const saveColor = colorMap[saveMutation.isPending][isSaved];
  const featureColor = colorMap[saveMutation.isPending][isFeatured];

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {/* save button */}
      {isPending ? (
        "Loading..."
      ) : (
        <button
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={saveColor}
            />
          </svg>
          <span>Save this post</span>
          {saveMutation.isPending && (
            <span className="ml-3 text-xs">(in progress)</span>
          )}
        </button>
      )}

      {/* feature button */}
      {isAdmin && (
        <button
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 22"
              stroke="black"
              strokeWidth="2"
              fill={featureColor}
            />
          </svg>
          <span>Feature this post</span>
        </button>
      )}

      {/* //delete button */}
      {currentUser &&
        (post?.item.user?._id === currentUser?._id || isAdmin) && (
          <button
            className="flex items-center gap-2 py-2 text-sm cursor-pointer"
            onClick={handleDelete}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-red-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>

            <span>Delete this post</span>
            {deleteMutation.isPending && (
              <span className="ml-3 text-xs">(in progress)</span>
            )}
          </button>
        )}
    </div>
  );
};

PostMenuActions.propTypes = {
  post: PropTypes.shape({
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      isFeatured: PropTypes.bool,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default PostMenuActions;
