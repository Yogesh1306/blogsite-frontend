import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const addImg = () => {
      img && setContent((prev) => prev + `<p><image src="${img.url}"/></p>`);
    };
    addImg();
  }, [img]);

  useEffect(() => {
    const addVideo = () => {
      video &&
        setContent(
          (prev) => prev + `<iframe class="ql-video" src="${video.url}"/>`,
        );
    };
    addVideo();
  }, [video]);

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/`, newPost, {
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/post/${res.data.item.slug}`);
    },
  });

  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      coverImg: cover.filePath || "",
      category: formData.get("category"),
      desc: formData.get("desc"),
      content,
    };
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 ">
      <h1 className="text-xl font-light">Create New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 flex-1 mb-6 relative"
      >
        <div className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max">
          <Upload type={"image"} setProgress={setProgress} setData={setCover}>
            {cover ? `${cover.name}` : "Add a cover Image"}
          </Upload>
        </div>

        {/* title */}
        <input
          className="bg-transparent text-4xl font-semibold outline-none mt-4"
          type="text"
          name="title"
          placeholder="My Awesome Story"
        />

        {/* choose categories */}
        <div className="flex items-center gap-5">
          <label htmlFor="categories" className="text-sm">
            Choose a Category:
          </label>
          <select
            name="category"
            id="categories"
            className="bg-white shadow-md px-3 w-35 py-2 rounded-xl text-start outline-0"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md  outline-0"
          name="desc"
          id="desc"
          placeholder="A short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type={"image"} setProgress={setProgress} setData={setImg}>
              📷
            </Upload>
            <Upload type={"video"} setProgress={setProgress} setData={setVideo}>
              📽️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="flex-1 rounded-xl bg-white shadow-md outline-0"
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {`Upload progress: ${progress}`}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
