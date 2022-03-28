import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Suggestion = (userId) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
      const suggestedProfiles = async () => {
        console.log("userId", userId);
        if(userId){

          const response = await getSuggestedProfiles(userId);
          setProfiles(response)
          console.log("response", response)
        }
      }

      suggestedProfiles()

  }, [userId])
  


  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestion for you</p>
      </div>
    </div>
  ) : (
    null
  );
};

export default Suggestion;

Suggestion.propTypes = {
  userId: PropTypes.string,
};
