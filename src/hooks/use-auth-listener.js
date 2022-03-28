import { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import FirebaseContext from "../context/firebase";


export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { auth } = useContext(FirebaseContext);


    useEffect(() => {
        const listener = onAuthStateChanged(auth, (authUser) => {
           if(authUser){
               //If  auser is present store the user in the local storage for consistency
               localStorage.setItem("authUser", JSON.stringify(authUser));
               setUser(authUser);
           }
           else {
               // if no user, clean up the local storage
                localStorage.removeItem("authUser");
                setUser(null);
           }
        });

        return () => listener;

    }, [auth])

    return { user }
}

