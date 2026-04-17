import { useSearchParams } from "react-router";
import PostList from "../components/PostList.jsx";
import SideMenu from "../components/SideMenu.jsx";

const PostListPage = () => {
  const [searchParams] = useSearchParams();
  const { cat, sort } = Object.fromEntries(searchParams);

  return (
    <div>
      <h1 className="mb-8 text-2xl">{`${sort?.toLocaleUpperCase() || ""} ${cat?.toLocaleUpperCase() || ""}`} BLOGS</h1>
      <div className="flex w-full gap-8">
        {/* posts */}
        <div className="w-full">
          <PostList />
        </div>
        <div className="">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
