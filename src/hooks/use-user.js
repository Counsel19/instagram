import { useState, useEffect, useContext } from 'react'
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

const useUser = () => {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUserObjByUserId = async (user) => {

            const [response] = await getUserByUserId(user.uid)
            setActiveUser(response)

            return response;
        }
        if(user?.uid){
            const result = getUserObjByUserId(user)

            return () => result;
        }
    }, [user])

    
    return { user: activeUser }
}

export default useUser;
