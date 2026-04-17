import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/comments/${postId}`,
  );
  return res.data;
};

const CommentsContainer = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { isPending, error, data, status } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      return await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${postId}`,
        newComment,
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentData = {
      desc: formData.get("desc"),
    };
    mutation.mutate(commentData);
  };

  let commentsContent;

  if (isPending) {
    commentsContent = "Loading...";
  } else if (error) {
    commentsContent = "Error loading comments";
  } else {
    commentsContent = (
      <>
        {mutation.isPending && (
          <Comment
            comment={{
              desc: `${mutation.variables.desc} (Sending...)`,
              createdAt: new Date(),
              user: currentUser,
            }}
            postId={postId}
          />
        )}
        {data?.comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} postId={postId} />
        ))}
      </>
    );
  }

  return (
    <>
      {isPending && (
        <div className="py-4 text-center">Loading...</div>
      )}

      {error && (
        <div className="py-4 text-center text-red-600">
          An error has occurred: {error.message}
        </div>
      )}
      {status === "success" && (
        <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
          <h1 className="text-xl text-gray-500 underline">Comments</h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between gap-8 w-full"
          >
            <textarea
              name="desc"
              placeholder="Write a comment..."
              className="w-full p-4 rounded-xl outline-0 bg-white"
            />
            <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
              Send
            </button>
          </form>
          {commentsContent}
        </div>
      )}
    </>
  );
};

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentsContainer;
