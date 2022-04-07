import {
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  where,
  limit,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));

  const result = await getDocs(q);

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));

  const result = await getDocs(q);

  return result.docs.map((user) => ({
    ...user.data(),
    userDocId: user.id,
  }));
}

//Get user from firebase where id passes true
export const getUserByUserId = async (userId) => {
  const q = query(collection(db, "users"), where("userId", "==", userId));
  const userDoc = await getDocs(q);

  const user = userDoc.docs.map((doc) => ({
    ...doc.data(),
    userDocId: doc.id,
  }));

  return user;
};

//Get the suggested profiles
export const getSuggestedProfiles = async (userId, following) => {
  const q = query(
    collection(db, "users"),
    where("userId", "!=", userId),
    limit(10)
  );

  const suggestedProfileDocs = await getDocs(q);

  const suggestedProfiles = suggestedProfileDocs.docs
    .map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }))
    .filter((profile) => !following.includes(profile.userId));

  return suggestedProfiles;
};

//add the followed user to the follwing array of the active user
export const updateActiveUserFollowing = async (
  suggestedUserId,
  loggedInUserDocId,
  isFollowingProfile
) => {

  const userDoc = doc(db, "users", loggedInUserDocId);

  await updateDoc(userDoc, {
    following: isFollowingProfile
      ? arrayRemove(suggestedUserId)
      : arrayUnion(suggestedUserId),
  });
};

//add the active user to the followed array of the followed users
export const updateFollowedUsersFollowers = async (
  suggestedUserDocId,
  loginUserId,
  isFollowingProfile
) => {
  const userDoc = doc(db, "users", suggestedUserDocId);

  await updateDoc(userDoc, {
    followers: isFollowingProfile
      ? arrayRemove(loginUserId)
      : arrayUnion(loginUserId),
  });
};

export const getPhotos = async (loggedinUserId, following) => {
  const q1 = query(collection(db, "photos"), where("userId", "in", following));
  const q2 = query(
    collection(db, "photos"),
    where("userId", "==", loggedinUserId)
  );
  const results = await Promise.all([getDocs(q1), getDocs(q2)]);

  const photoData = results.map((result) =>
    result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id,
    }))
  );

  const followedUsersPhotos = photoData.flat()



  const photosWithUserDetails = await Promise.all(
    followedUsersPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(loggedinUserId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );


  return photosWithUserDetails;
};

export const getUserPhotosByUserName = async (username) => {
  const [user] = await getUserByUsername(username);

  const userId = user.userId;

  const q = query(collection(db, "photos"), where("userId", "==", userId));
  const result = await getDocs(q);

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const photosWithLikedDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithLikedDetails;
};

export const isUserFollowingProfile = async (loggedInUserId, profileUserId) => {
  const q = query(
    collection(db, "users"),
    where("userId", "==", loggedInUserId),
    where("following", "array-contains", profileUserId)
  );

  const result = await getDocs(q);
  const response = result.docs.map((item) => ({
    ...item.data(),
    userDocId: item.id,
  }));

  return response.length > 0;
};

export const toggleFollow = async (
  profileUserId,
  profileUserDocId,
  loggedInUserId,
  loggedInUserDocId,
  isFollowingProfile
) => {
  await updateActiveUserFollowing(
    profileUserId,
    loggedInUserDocId,
    isFollowingProfile
  );
  await updateFollowedUsersFollowers(
    profileUserDocId,
    loggedInUserId,
    isFollowingProfile
  );
};
