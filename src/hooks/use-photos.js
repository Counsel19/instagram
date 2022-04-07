import { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);

  const {
    user: { uid: loggedinUserId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const user = await getUserByUserId(loggedinUserId);
      const { following } = user[0];

      
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(loggedinUserId, following);

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

        if(followedUserPhotos.length === 0){
          setPhotos(null);
        }else{
         setPhotos(followedUserPhotos);
        }

      }else{
        setPhotos(null);
      }


    };

    if (loggedinUserId) {
      getTimelinePhotos(loggedinUserId);
    }
  }, [loggedinUserId]);

  return photos;
};

export default usePhotos;
