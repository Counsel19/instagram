
import { memo } from "react";
import React, { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import Suggestion from "./Suggestion";
import User from "./User";

const Sidebar = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const { user } = useUser();

  console.log("user--index", user);

  useEffect(() => {
    if (user !== (undefined || {})) {
      const { fullname, username, userId } = user;
      setFullname(fullname);
      setUsername(username);
      setUserId(userId);
    }
  }, [user]);

  return (
    <div className="p-4">
      <User username={username} fullname={fullname} />
      <Suggestion userId={userId} />
    </div>
  );
};

export default memo(Sidebar);

