import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { getUserPhotosByUserName } from "../../services/firebase";
import Photos from "./Photos";

import { BarLoader } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

export default function UserProfile({ username, profileUser }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserName(username);

      if(photos.length === 0){
        dispatch({
          profile: profileUser,
          photosCollection: null,
          followerCount: profileUser.followers.length,
        });
      }else{
        dispatch({
          profile: profileUser,
          photosCollection: photos,
          followerCount: profileUser.followers.length,
        });
      }
      
    };

    getProfileInfoAndPhotos();
  }, [profileUser, username]);

  return Object.keys(profile).length === 0 ? (
    <BarLoader
      text={"Loading..."}
      bgColor={"#fff"}
      center={true}
      width={"150px"}
      height={"150px"}
    />
  ) : (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photosDetails={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
};
