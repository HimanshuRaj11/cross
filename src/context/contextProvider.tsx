"use client"
import React, { createContext, useState, useContext } from "react";


interface GlobalContextType {
    createPostbtn: boolean;
    setCreatePostBtn: React.Dispatch<React.SetStateAction<boolean>>;
    Loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    Loginbtn: boolean;
    setLoginBtn: React.Dispatch<React.SetStateAction<boolean>>;
    Registerbtn: boolean;
    setRegisterBtn: React.Dispatch<React.SetStateAction<boolean>>;
    showAuth: boolean;
    setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
    Popover: boolean;
    setPopover: React.Dispatch<React.SetStateAction<boolean>>;
    Search: boolean;
    setSearch: React.Dispatch<React.SetStateAction<boolean>>;
    NotificationPop: boolean;
    setNotificationPop: React.Dispatch<React.SetStateAction<boolean>>;
    socket: any;
    setSocket: React.Dispatch<React.SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextType>({
    createPostbtn: false,
    setCreatePostBtn: () => { },
    Loading: false,
    setLoading: () => { },
    Loginbtn: false,
    setLoginBtn: () => { },
    Registerbtn: false,
    setRegisterBtn: () => { },
    showAuth: false,
    setShowAuth: () => { },
    Popover: false,
    setPopover: () => { },
    Search: false,
    setSearch: () => { },
    NotificationPop: false,
    setNotificationPop: () => { },
    socket: undefined,
    setSocket: () => { },

});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [createPostbtn, setCreatePostBtn] = useState(false);
    const [Loading, setLoading] = useState(false)
    const [Loginbtn, setLoginBtn] = useState(false);
    const [Registerbtn, setRegisterBtn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [Popover, setPopover] = useState(false);
    const [Search, setSearch] = useState(false);
    const [NotificationPop, setNotificationPop] = useState(false);
    const [socket, setSocket] = useState(undefined);

    return (
        <GlobalContext.Provider value={{
            Popover, setPopover,
            Loading, setLoading,
            createPostbtn, setCreatePostBtn,
            Loginbtn, setLoginBtn,
            Registerbtn, setRegisterBtn,
            showAuth, setShowAuth,
            Search, setSearch,
            NotificationPop, setNotificationPop,
            socket, setSocket,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
