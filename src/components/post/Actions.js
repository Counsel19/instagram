import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: loggedInUserId = "" },
  } = useContext(UserContext);


  const [toggledLiked, setToggledLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { db } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggledLiked((toggledLiked) => !toggledLiked);

    const photoRef = doc(db, "photos", docId);
    updateDoc(photoRef, {
      likes: toggledLiked
        ? arrayRemove(loggedInUserId)
        : arrayUnion(loggedInUserId),
    });

    setLikes((likes) => (toggledLiked ? likes - 1 : likes + 1));
  };


  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(event) => event.key === "Enter" && handleToggleLiked}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggledLiked ? "fill-red text-red-primary" : "text-black-light"
            }`}
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <svg
            className="w-8 text-black-light select-none cursor-pointer"
            onClick={handleFocus}
            onKeyDown={(event) => event.key === "Enter" && handleFocus()}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
};

export default Actions;

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
};
