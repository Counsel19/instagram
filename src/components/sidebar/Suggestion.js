import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SuggestedProfile from "./SuggestedProfile";

const Suggestion = ({ loginUserId, loggedInUserDocId, following }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      if (loginUserId) {
        const response = await getSuggestedProfiles(loginUserId, following);
        setProfiles(response);
      }
    };

    suggestedProfiles();
  }, [loginUserId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col h-full">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestion for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUserDocId={profile.docId} //docid for the suggested profiles
            loggedInUserDocId={loggedInUserDocId} //Currently log user docid
            suggestedUserUsername={profile.username}
            suggestedUserId={profile.userId} // profile id for each suggestion
            loginUserId={loginUserId}
          /> // active user
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestion;

Suggestion.propTypes = {
  loginUserId: PropTypes.string,
  following: PropTypes.array,
  activeUserDocId: PropTypes.string,
};
