import { useState } from "react";
import ImageComponent from "./ImageComponent";
import { NavLink } from "react-router";
import {useDispatch, useSelector} from "react-redux"
import { logout } from "../redux/userSlice";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()


  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full h-16 md:h-20 flex justify-between items-center ">
      <NavLink
        to={"/"}
        className=" flex justify-center items-center gap-3 font-bold text-2xl"
      >
        {/* logo */}
        <ImageComponent
          classname={"w-8 h-8"}
          src={"/logo.png"}
          alt={"blogSite Logo"}
          w={32}
          h={32}
        />
        <span className="">BlogSite</span>
      </NavLink>
      {/* Desktop menu */}
      <div className=" hidden md:flex">
        {/* right side links */}
        <ul className="flex justify-center items-center gap-8 xl:gap-12 font-medium">
          <NavLink to={"/"}>Home</NavLink>
           <NavLink to={"/posts?sort=trending"}>Trending</NavLink>
          <NavLink to={"/posts?sort=popular"}>Most Popular</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          {!currentUser && <NavLink
            to={"/login"}
            className="bg-[#2340af] text-white px-4 py-1.5 rounded-3xl cursor-pointer"
          >
            Login 👋
          </NavLink>}
          {currentUser && <button
            className="bg-[#2340af] text-white px-4 py-1.5 rounded-3xl cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </button>}
        </ul>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden mr-2 z-10">
        {/* Mobile menu button */}
        <button onClick={() => setOpenMenu((prev) => !prev)}>
          {openMenu ? <X className="w-8 h-8"/> : <Menu />}
        </button>
        {/* Mobile menu list */}
        <div
          className={`w-full h-screen flex flex-col justify-center items-center gap-8 absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${openMenu ? "right-0" : "-right-full"}`}
        >
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/posts?sort=trending"}>Trending</NavLink>
          <NavLink to={"/posts?sort=popular"}>Most Popular</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          {!currentUser && <NavLink
            to={"/login"}
            className="bg-[#2340af] text-white px-4 py-1.5 rounded-3xl cursor-pointer"
          >
            Login 👋
          </NavLink>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
