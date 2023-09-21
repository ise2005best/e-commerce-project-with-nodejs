import { createContext, useState, useEffect } from "react";

export const userContext = createContext({
    setCurrentUser : () => null,
    currentUser: null,
});


export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser,
        setCurrentUser,
    }
    
    return <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
}