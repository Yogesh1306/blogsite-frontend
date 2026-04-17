import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries(searchParams);
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;

    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const allPosts = data?.pages?.flatMap((page) => page.items) || [];

  let loadMoreLabel;

  if (isFetchingNextPage) {
    loadMoreLabel = "Loading more...";
  } else if (hasNextPage) {
    loadMoreLabel = "Load More";
  } else {
    loadMoreLabel = "All posts loaded";
  }

  return (
    <>
      {status === "loading" && (
        <div className="py-4 text-center">Loading...</div>
      )}

      {status === "error" && (
        <div className="py-4 text-center text-red-600">
          An error has occurred: {error.message}
        </div>
      )}

      {status === "success" && (
        <>
          {allPosts.map((post) => {
            return <PostListItem key={post._id} post={post} />;
          })}
          <div className="flex flex-col justify-center items-center h-10">
            {loadMoreLabel}
            {isFetching && !isFetchingNextPage ? "Fetching..." : null}
          </div>
        </>
      )}
    </>
  );
};

export default PostList;
