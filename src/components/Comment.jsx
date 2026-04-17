import { useSelector } from "react-redux";
import ImageComponent from "./ImageComponent";
import { format } from "timeago.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

const Comment = ({ comment, postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment._id}`,
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted!!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };
  return (
    <div className="bg-slate-50 p-3 rounded-xl mb-5">
      <div className="flex items-center gap-4">
        {comment?.user?.avatar && (
          <ImageComponent
            src={comment?.user?.avatar}
            classname="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}
        <span className="font-medium">{comment?.user?.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment?.createdAt)}
        </span>

        {currentUser &&
          (currentUser?._id === comment?.user?._id ||
            currentUser.role === "admin") && (
            <button
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={handleDelete}
            >
              delete
            </button>
          )}
      </div>
      <p className="mt-4">{comment?.desc}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string, 
    }).isRequired,
  }).isRequired,
  postId: PropTypes.string.isRequired,
};

export default Comment;
