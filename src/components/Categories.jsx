import React from "react";
import { useSearchParams } from "react-router";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };
  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col items-start gap-3 text-sm">
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("general")}
        >
          All
        </button>
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </button>
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </button>
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("databases")}
        >
          Databases
        </button>
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("seo")}
        >
          Search Engines
        </button>
        <button
          className={"underline cursor-pointer"}
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </button>
      </div>
    </div>
  );
};

export default Categories;
