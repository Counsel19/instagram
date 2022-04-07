import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span 1">
        <img
         src={`/images/avatars/${username === "counsel" || username === "orwell" || username === "fred" || username === "dali" || username === "steve"  ? `${username}.jpg` : "default.png"}`}
          alt={username}
          className="rounded-full w-16 flex mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

// User.whyDidYouRender = true
