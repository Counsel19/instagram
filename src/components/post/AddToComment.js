import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function AddToComment({
  docId,
  comments,
  setComments,
  commentInput
}) {
  const [comment, setComment] = useState("");
  const { db } = useContext(FirebaseContext);

  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, {displayName, comment}]);
    setComment("")

    const photoRef = doc(db, "photos", docId)
    return updateDoc(photoRef, {
        comments: arrayUnion({displayName, comment})
    })
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 outline-0"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={ commentInput }
        />

        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length <= 1}
          type="submit"
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddToComment.prototype = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
  focus: PropTypes.bool.isRequired,
};
