import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  photosCount,
  profile: {
    userDocId: profileUserDocId,
    userId: profileUserId,
    dateCreated: profileDateCreated,
    emailAddress: profileEmailAddress,
    fullName: profileFullName,
    username: profileUsername,
    followers: profileFollowers = [],
    following: profileFollowing = [],
  },
  followerCount,
  setFollowerCount,
}) {
  const { user } = useUser();

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;
  
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowingProfile = await isUserFollowingProfile(
        user.userId,
        profileUserId
      );

      setIsFollowingProfile(isFollowingProfile);
    };

    if (user?.userId && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
    
  }, [user, profileUserId, isFollowingProfile]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });

    await toggleFollow(
      profileUserId,
      profileUserDocId,
      user.userId,
      user.userDocId,
      isFollowingProfile
    );
  };

  return (!user.username && !profileUsername) ? (
    <Skeleton count={1} width={800} height={400} />
  ) : (
    <div className="relative grid grid-cols-3 gap-3 justify-between max-w-screen pb-4 md:gap-5 md:mx-auto lg:max-w-screen-lg md:pb-0 ">
      <div className="container items-center flex justify-center p-3 md:p-10">
        {profileUsername && (
          <img
          src={`/images/avatars/${profileUsername === "counsel" || profileUsername === "orwell" || profileUsername === "fred" || profileUsername === "dali" || profileUsername === "steve"  ? `${profileUsername}.jpg` : "default.png"}`}
            alt={`${profileUsername} profile`}
            className="rounded-full h-20 w-20 flex md:h-40 md:w-40"
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-3xl font-extralight mr-4 lg:text-4xl">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-2 md:mt-5">
          {followerCount === undefined ||
          profileFollowing.length === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-4 md:mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `} {photosCount === 1 ? `post` : `posts`}
              </p>
              <p className="mr-4 md:mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `} {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-4 md:mr-10">
                <span className="font-bold">{profileFollowing.length}</span>{" "}
                {` `}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-5 absolute top-24 left-5 md:static">
          <p className="font-medium ">
            {!profileFullName ? (
              <Skeleton count={1} height={24} />
            ) : (
              profileFullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    userDocId: PropTypes.string,
    userId: PropTypes.string,
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};
