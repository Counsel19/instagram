import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddToComment from "./AddToComment";
import { ViewCommentsContext } from "../../context/viewComments";

// username, src, caption, totalLikes, likedPhoto
export default function Comments({
  docId,
  username,
  src,
  caption,
  totalLikes,
  likedPhoto,
  comments: allComments,
  posted,
  commentInput
}) {
  const [comments, setComments] = useState(allComments);
  const { dispatchViewComments } = useContext(ViewCommentsContext);


  const handleShowViewComments = () => {

    dispatchViewComments({
      allComments: comments,
      username: username,
      src: src,
      caption: caption,
      posted: posted,
      docId: docId,
      totalLikes: totalLikes,
      viewCommentsOpen: true,
      likedPhoto: likedPhoto,
    });
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={handleShowViewComments}
          >
            View all {comments.length} commments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
              <span>{item.comment}</span>
            </Link>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>

      <AddToComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
        
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  allComments: PropTypes.array,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object,
};
