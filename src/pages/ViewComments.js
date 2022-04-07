import { useState, useContext, useEffect } from "react";
import Header from "../components/post/Header";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import Actions from "../components/post/Actions";
import AddToComment from "../components/post/AddToComment";
import { ViewCommentsContext } from "../context/viewComments";
import Footer from "../components/post/Footer";

export default function ViewComments() {
  const {
    viewCommentsState: {
      allComments,
      username,
      src,
      caption,
      posted,
      docId,
      totalLikes,
      viewCommentsOpen,
      likedPhoto,
      commentInput,
      handleFocus
    }, dispatchViewComments
  } = useContext(ViewCommentsContext);

  // ${viewCommentsOpen && "overflow-y-hidden h-screen"}`
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(allComments)
  }, [allComments])

  const handleCloseViewComments = () => {
    dispatchViewComments({
      viewCommentsOpen: false,
    })

  }
  return viewCommentsOpen && (
    <div className="flex justify-center items-center bg-gray-overlay fixed top-0 bottom-0 left-0 right-0 overflow-y-hidden inset-0 z-50">
     
      <div className="flex items-center justify-center h-full w-full lg:h-5/6 lg:w-4/5 ">
        <div className="hidden grow flex-wrap justify-center items-center h-full bg-black-primary lg:flex lg:w-2/2 xl:w-2/3">
          <img
            src={src}
            alt={caption}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex relative flex-col bg-white grow overflow-y-hidden h-full max-h-full w-full lg:w-2/2 xl:w-1/3 ">
          <Header username={username} />
          <div className="flex flex-col ml-4 mt-0 comments h-3/5 overflow-y-auto">
          <Footer caption={caption} username={username} />
            {comments.map((item) => (
              <div
                key={`${item.comment}-${item.displayName}`}
                className="mb-3 mt-3 flex"
              >
                <Link to={`/p/${item.displayName}`} className="flex" onClick={handleCloseViewComments}>
                  <img
                    className="rounded-full h-8 w-8 flex mr-4"
                    src={`/images/avatars/${item.displayName}.jpg`}
                    alt={`${item.displayName} profile`}
                  />
                  <span className="mr-1 font-bold">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-primary">
            <Actions
              docId={docId}
              totalLikes={totalLikes}
              likedPhoto={likedPhoto}
              handleFocus={handleFocus}
            />

            <p className="text-gray-base uppercase text-xs mt-2 ml-4">
              {formatDistance(posted, new Date())} ago
            </p>
            <AddToComment
              docId={docId}
              comments={comments}
              setComments={setComments}
              commentInput={commentInput}
            />
          </div>
        </div>
      </div>
      <svg
        className=" hidden h-10 w-10 absolute top-10 right-10 cursor-pointer text-white md:block"
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
}
