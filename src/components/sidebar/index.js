
import { memo } from "react";
import React, { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import Suggestion from "./Suggestion";
import User from "./User";


const Sidebar = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [following, setFollowing] = useState([]);
  const [loggedInUserDocId, setLoggedInUserDocId] = useState("");


  const { user } = useUser();

  useEffect(() => {

    if (Object.keys(user).length !== 0) {
    
      const { fullName, username, userId, following, userDocId } = user;
      setFullName(fullName);
      setUsername(username);
      setUserId(userId);
      setFollowing(following)
      setLoggedInUserDocId(userDocId)


    }
  }, [user]);


  return (
    <div className="p-4 col-span-3 h-full md:col-span-1">
      <User username={username} fullName={fullName}/>
      <Suggestion loginUserId={userId} loggedInUserDocId ={loggedInUserDocId} following={following}/>
    </div>
  );
};

export default memo(Sidebar);

