import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../contants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile";
import { ViewCommentsContext } from "../context/viewComments";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [active, setActive] = useState(false)
  const { viewCommentsState: {viewCommentsOpen} } = useContext(ViewCommentsContext);

  useEffect(() => {
    const checkUserExist = async () => {
      const [userData] = await getUserByUsername(username);
      
      setProfileUser(userData)
      
      if (userData.userId) {
          setUserExists(true);
          document.title = userData.fullName;
        } else {
            navigate(ROUTES.NOT_FOUND);
        }
    };
    
    checkUserExist();
}, [username, navigate]);

return userExists ? (
    
    <div className={`bg-gray-background ${viewCommentsOpen && "overflow-y-hidden h-screen"}`} onClick={() =>  active && setActive(false)}>
        
      <Header active={active} setActive={setActive}/>
      <div className="mx-auto max-w-screen-lg" >
          <UserProfile username={username} profileUser={profileUser} />
      </div>
    </div>
  ) : null;
}
