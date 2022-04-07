import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";
import { ViewCommentsContext } from "../../context/viewComments";

export default function Photos({ photosDetails }) {
  const { dispatchViewComments } = useContext(ViewCommentsContext);

  const handlePostOpen = (photo) => {
    dispatchViewComments({
      allComments: photo.comments,
      username: photo.username,
      src: photo.imageSrc,
      caption: photo.caption,
      posted: photo.dateCreated,
      docId: photo.docId,
      totalLikes: photo.likes.length,
      viewCommentsOpen: true,
      likedPhoto: photo.userLikedPhoto,
    });
  };

return (
    <div className="h-16 border-t border-gray-primary w-full mt-12 pt-4 px-2 md:px-2">
      <div className="grid grid-cols-3 gap-1 mb-12 md:gap-8">
        {photosDetails?.length === 0 ? (
          <Skeleton count={3} width={320} height={400} />
        ) : photosDetails?.length > 0 ? (
          photosDetails.map((photo) => (
            <div key={photo.docId} className="relative group">
              
              <img 
              src={`${photo.username === "counsel" || photo.username === "orwell" || photo.username === "fred" || photo.username === "dali" || photo.username === "steve"  ? `${photo.imageSrc}` : "/images/avatars/default.png"}`} 
              // src={photo.imageSrc} 
              alt={photo.caption} />
              <div
                className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded hidden group-hover:flex cursor-pointer"
                onClick={() => handlePostOpen(photo)}
              >
                <p className="flex items-center text-white font-bold ">
                  <svg
                    className="mr-4 w-4 md:mr-8 md:w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {photo.likes.length}
                </p>
                <p className="flex items-center text-white font-bold ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-4 w-4 md:mr-8 md:w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : <p className=" col-span-3 text-2xl text-bold text-center md:text-4xl">No Photos </p>}
      </div>
    </div>
  );
}
Photos.propTypes = {
  photosDetails: PropTypes.array,
};
