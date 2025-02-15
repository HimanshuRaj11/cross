// components/ChatInterface.tsx
'use client'
import ChatList from '@/components/ChatList';
import ChatSpace from '@/components/ChatSpace';
import { useGlobalContext } from '@/context/contextProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ChatInterface: React.FC = () => {
    const { User: { user } } = useSelector((state: any) => state.User);
    const { socket, setSocket } = useGlobalContext()
    const [selectedChat, setselectedChat] = useState()

    const [showList, setShowList] = useState(true)
    const [showChat, setShowChat] = useState(false)
    const [query, setQuery] = useState<string>("")
    const [UserList, setUserList] = useState<any>()
    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setQuery(e.target.value)
            if (query.length > 1) {
                const { data } = await axios.post(`${baseUrl}/api/v1/Search/user`, { query })
                if (data.success) {
                    setUserList(data.user)
                }
                return
            } else {
                setUserList([])
            }
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        if (user) {
            const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URI}`)
            setSocket(socket)
            socket.emit("User", user?._id)

        }
    }, [user])
    return (
        <div className="flex h-[83%] absolute top-[4em] sm:top-0 sm:h-screen justify-between w-full">


            <div className={` ${showList ? '' : 'hidden md:block'} px-7 md:p-2 w-[100%] md:w-[38%] lg:w-[28%] bg-gray-100 p-2 border-r border-gray-300`}>
                <h2 className="text-xl font-bold mb-4">Chats</h2>

                <div className="flex items-center justify-center mt-4">
                    <input
                        value={query}
                        type="text"
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <ChatList UserList={UserList} setselectedChat={setselectedChat} setShowList={setShowList} setShowChat={setShowChat} />
            </div>

            <div className={` ${showChat ? '' : 'hidden md:block'} w-[100%] md:w-[62%] lg:w-[72%] `}>
                {
                    selectedChat && <ChatSpace selectedChat={selectedChat} setShowList={setShowList} setShowChat={setShowChat} />
                }
            </div>



        </div>
    );
};

export default ChatInterface;