import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateActiveUserFollowing,
  updateFollowedUsersFollowers,
} from "../../services/firebase";
const SuggestedProfile = ({
  suggestedUserDocId,
  loggedInUserDocId,
  suggestedUserUsername,
  suggestedUserId,
  loginUserId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateActiveUserFollowing(suggestedUserId, loggedInUserDocId, false);
    await updateFollowedUsersFollowers(suggestedUserDocId, loginUserId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${suggestedUserUsername === "counsel" || suggestedUserUsername === "orwell" || suggestedUserUsername === "fred" || suggestedUserUsername === "dali" || suggestedUserUsername === "steve"  ? `${suggestedUserUsername}.jpg` : "default.png"}`}
          alt={`${suggestedUserUsername}`}
          className="rounded-full w-8 flex mr-3"
        />

        <Link to={`/p/${suggestedUserUsername}`} className="font-bold text-sm">
          {suggestedUserUsername}
        </Link>
      </div>

      <button
        className="text-sm font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  suggestedUserDocId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
  suggestedUserUsername: PropTypes.string,
  suggestedUserId: PropTypes.string,
  loginUserId: PropTypes.string,
};
