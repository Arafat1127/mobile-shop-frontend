import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../Context/AuthProvider";
import { MdHomeFilled } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaLaptop } from "react-icons/fa";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const menuItems = (
    <React.Fragment>
      <li className="md:text-xl text-center items-center  text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/home">
          {" "}
          <MdHomeFilled />
          Home{" "}
        </NavLink>
      </li>
      <li className="md:text-xl text-center items-center  text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/mobile">
          {" "}
          <HiOutlineDevicePhoneMobile />
          Mobile{" "}
        </NavLink>
      </li>
      <li className="md:text-xl text-center items-center  text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/blog">
          <FaLaptop />
          Blog
        </NavLink>
      </li>

      <li className="md:text-xl text-center items-center text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li className="md:text-xl text-center items-center text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      <li className="md:text-xl text-center items-center hover:font-semibold text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/sign-in">Login</NavLink>
      </li>
      <li className="md:text-xl text-center items-center hover:font-semibold text-black  transform-3d hover:text-white hover:bg-primary hover:rounded-sm mr-2">
        <NavLink to="/orders"> <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg></NavLink>
      </li>
      
    </React.Fragment>
  );
  return (
    <div>
      <div className=" bg-secondary navbar fixed top-0 left-0 right-0 z-40  px-5 shadow-lg  dark:bg-gray-800 dark:text-white duration-200">
        <div className="navbar-start justify-between md:justify-start w-[65%] md:w-[50%]">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/home" className="w-20 h-20">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>

        <div className="navbar-end w-[35%] md:w-[50%] ">
          <div className="pr-20 pb-5">
           
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp "
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60 p-2 shadow"
            >
              {user?.uid ? (
                <>
                  <li>
                    <a className="justify-between font-bold">
                      {user?.displayName}
                      <span className="badge">{user?.uid.slice(0, 10)}</span>
                    </a>
                  </li>
                  <li>
                    <a className="font-bold">
                      <span>Email</span>
                      {user?.email}{" "}
                    </a>
                  </li>
                 
                  <li className=" text-center items-center font-bold hover:bg-primary hover:text-secondary">
                    <a onClick={logOut}>Logout</a>
                  </li>
                </>
              ) : (
                <Link to="/sign-up">
                  <li className=" text-center items-center font-bold hover:bg-primary hover:text-secondary">
                    Sign Up
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <label
            htmlFor="dashboard-drawer"
            className=" drawer-button md:hidden "
          >
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
