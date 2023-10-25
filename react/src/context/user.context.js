import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
const usersFirstName = Cookies.get("usersFirstName")


export const userContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    console.log(Cookies.get())
    useEffect(()=>{
        setCurrentUser(usersFirstName)
    },[currentUser])
    // setCurrentUser(usersFirstName)
    const value = { currentUser, setCurrentUser }

    return <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
}