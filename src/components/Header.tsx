import React, { MouseEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/context";
import { SecondaryBtn } from "./Button";

interface HeaderProps {
  children?: React.ReactNode | React.ReactNodeArray;
  user?: any;
}

const RenderCommonNav = function({ children, user }: HeaderProps) {
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState<boolean>(false);
  const onToggleMenu = function(e: MouseEvent) {
    e.stopPropagation();
    setToggle(toggle => !toggle);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed w-full z-10 top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          className="text-white no-underline hover:text-white hover:no-underline"
          to="/"
        >
          <span className="text-2xl pl-2">
            <i className="em em-grinning"></i> Review.io
          </span>
        </Link>
      </div>

      <div className={`${!toggle ? "lg:hidden" : "block"}`}>
        <button
          id="nav-toggle"
          onClick={onToggleMenu}
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {!user && (
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
            !toggle ? "hidden" : "lg:block"
          } lg:pt-0"
          id="nav-content`}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {!pathname.includes("public") && (
              <li className="mr-3">
                <Link
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            )}
            <li className="mr-3">
              <Link
                className="inline-block py-2 px-4 text-white no-underline"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
      {children}
    </nav>
  );
};

const Header = () => {
  const auth = useAuth();
  const { pathname } = useLocation();
  const { user } = auth;
  const logoutHandler = function(e: MouseEvent) {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  if (pathname.includes("public") && !user) {
    return (
      <div className=" bg-gray-800 h-12 mb-4">
        <RenderCommonNav />
      </div>
    );
  }
  return (
    <header className="mb-16">
      <RenderCommonNav user={user}>
        {user && (
          <div
            className="w-full lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0"
            id="nav-content"
          >
            <SecondaryBtn
              label=""
              name="logout"
              icon="fa fa-power-off"
              onClickEvent={logoutHandler}
            />
          </div>
        )}
      </RenderCommonNav>
    </header>
  );
};
export default React.memo(Header);
