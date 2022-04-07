import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../contants/routes";
import { signOut } from "firebase/auth";

const Header = ({ active, setActive }) => {
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <header className=" top-0 w-full h-12 bg-white border-b border-gray-primary mb-8 md:h-16">
      <div className="container mx-auto max-w-screen-lg h-full relative">
        <div className="flex justify-center items-center h-full md:justify-between">
          <div className="flex items-center justify-center align-items cursor-pointer md:w-fit">
            <h1 className="flex justify-center w-full">
              <Link
                to={ROUTES.DASHBOARD}
                aria-label="Instagram logo"
                className="flex justify-center md:justify-start"
              >
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="mt-2 w-6/12 "
                />
              </Link>
            </h1>
          </div>
          <div className="fixed bottom-0 flex h-12 w-full bg-white border-t border-gray-primary justify-around text-center  items-center align-items md:w-fit md:static md:border-none ">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <svg
                    className="w-7 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <Link to="/">
                  <svg
                    className="w-7 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    className="w-7 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    className="w-7 mr-6 text-black-light cursor-pointer hidden md:inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    className="w-7 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>

                <div className="relative inline-block text-left">
                  <div
                    onClick={() => setActive(!active)}
                    className="cursor-pointer rounded-full h-8 w-8 inline-flex justify-center border border-gray-primary shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  >
                    <img
                        className="rounded-full hidden md:block"
                        id="menu-button"
                        src={`/images/avatars/${user.displayName === "counsel" || user.displayName === "orwell" || user.displayName === "fred" || user.displayName === "dali" || user.displayName === "steve"  ? `${user.displayName}.jpg` : "default.png"}`}
                        alt={`${user.displayName} profile`}
                      />
                    <Link to={`/p/${user.displayName}`} className="md:hidden" >
                      <img
                        className="rounded-full"
                        id="menu-button"
                        src={`/images/avatars/${user.displayName === "counsel" || user.displayName === "orwell" || user.displayName === "fred" || user.displayName === "dali" || user.displayName === "steve"  ? `${user.displayName}.jpg` : "default.png"}`}
                        alt={`${user.displayName} profile`}
                      />
                    </Link>
                  </div>
                  <div
                    className={`origin-bottom-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-primary focus:outline-none transition ease-out duration-100  ${
                      active
                        ? "transform opacity-100 scale-100 z-50"
                        : "transform opacity-0 scale-95"
                    } hidden md:block`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1">
                      <Link
                        to={`/p/${user.displayName}`}
                        className=" block px-4 py-2 text-sm hover:bg-gray-secondary"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/"
                        className=" block px-4 py-2 text-sm hover:bg-gray-secondary "
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                      >
                        Saved
                      </Link>
                      <Link
                        to="/"
                        className=" block px-4 py-2 text-sm hover:bg-gray-secondary "
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                      >
                        Settings
                      </Link>
                      <Link
                        to="/"
                        className=" block px-4 py-2 text-sm hover:bg-gray-secondary "
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                      >
                        Switch Accounts
                      </Link>
                    </div>
                    <div className="py-1" role="none">
                      <button
                        type="button"
                        title="Sign out"
                        className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-secondary "
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                        onClick={() => signOut(auth)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            signOut(auth);
                          }
                        }}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
          <span className="text-sm mr-5 absolute top-4 right-0 md:hidden" onClick={() => signOut(auth)}>Sign Out</span>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};
