import React from "react";
import { NavLink } from "react-router";
import SearchComponent from "./SearchComponent";

const MainCategories = () => {
  return (
    <div className="hidden md:flex rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-center gap-8 bg-white w-full ">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap text-sm">
        <NavLink
          to={"/posts"}
          className={"bg-blue-800 text-white rounded-full px-3 py-2 "}
        >
          All Posts
        </NavLink>
        <NavLink
          to={"/posts?cat=web-design"}
          className={"hover:bg-blue-50 rounded-full px-3 py-2 "}
        >
          Web Design
        </NavLink>
        <NavLink
          to={"/posts?cat=development"}
          className={"hover:bg-blue-50 rounded-full px-3 py-2 "}
        >
          Development
        </NavLink>
        <NavLink
          to={"/posts?cat=databases"}
          className={"hover:bg-blue-50 rounded-full px-3 py-2 "}
        >
          Databases
        </NavLink>
        <NavLink
          to={"/posts?cat=seo"}
          className={"hover:bg-blue-50 rounded-full px-3 py-2 "}
        >
          Search Engines
        </NavLink>
        <NavLink
          to={"/posts?cat=marketing"}
          className={"hover:bg-blue-50 rounded-full px-3 py-2 "}
        >
          Marketing
        </NavLink>
      </div>
      {/* separator */}
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <SearchComponent/>
    </div>
  );
};

export default MainCategories;
