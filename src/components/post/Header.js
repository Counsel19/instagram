import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { ViewCommentsContext } from "../../context/viewComments";

const Header = ({ username }) => {
  const {viewCommentsState: {viewCommentsOpen}, dispatchViewComments} = useContext(ViewCommentsContext)

  const handleCloseViewComments = () => {
    dispatchViewComments({
      viewCommentsOpen: false,
    })
  }

  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-8"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>

      <svg
        className={`h-6 w-6 absolute top-5 right-10 cursor-pointer ${viewCommentsOpen ? "block" : "hidden"} lg:hidden`}
        onClick={handleCloseViewComments}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default Header;


Header.propTypes = {
    username: PropTypes.string.isRequired,
}