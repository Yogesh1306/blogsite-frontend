import { useSearchParams } from "react-router";
import SearchComponent from "./SearchComponent";
import Categories from "./Categories";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <SearchComponent />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <div className="flex flex-col justify-center gap-3 text-sm">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            id="newest"
            value="newest"
            className="cursor-pointer"
          />
          <label htmlFor="newest">Newest</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            id="most-popular"
            className="cursor-pointer"
          />
          <label htmlFor="most-popular">Most Popular</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            id="trending"
            className="cursor-pointer"
          />
          <label htmlFor="trending">Trending</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            id="oldest"
            className="cursor-pointer"
          />
          <label htmlFor="oldest">Oldest</label>
        </div>
      </div>

      <Categories />
    </div>
  );
};

export default SideMenu;
