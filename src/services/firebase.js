import { collection, getDocs, query, where } from "firebase/firestore";
import { db, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));

  const result = await getDocs(q);

  return result.docs.map((user) => user.data().length > 0);
}

//Get user from firebase where id passes true
export const getUserByUserId = async (userId) => {
  
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const userDoc = await getDocs(q);

    const user = userDoc.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    return user;
};


export const getSuggestedProfiles = async (userId) => {
  console.log("id", userId);
  const q = query(collection(db, "users"), where("userId", "!=", userId));

  const suggestedProfileDocs = await getDocs(q);

  console.log("suggestedProfileDocs--firebase", suggestedProfileDocs);

  const suggestedProfiles = suggestedProfileDocs.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  console.log("suggestedProfiles-firebase", suggestedProfiles)
  return suggestedProfiles;

}
