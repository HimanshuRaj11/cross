// components/ChatInterface.tsx
'use client'
import ChatList from '@/components/ChatList';
import ChatSpace from '@/components/ChatSpace';
import { useGlobalContext } from '@/context/contextProvider';
import React, { useEffect, useState } from 'react';


const ChatInterface: React.FC = () => {
    const [selectedChat, setselectedChat] = useState()

    return (
        <div className="flex h-[83%] absolute top-[4em] sm:top-0 sm:h-screen justify-between w-full">
            <div className="sm:w-[38%] lg:w-[28%] bg-gray-100 p-2 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-4">Chats</h2>

                <div className="flex items-center justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <ChatList setselectedChat={setselectedChat} />
            </div>
            <div className="sm:w-[62%] lg:w-[72%] ">
                {
                    selectedChat && <ChatSpace selectedChat={selectedChat} />
                }
            </div>
        </div>
    );
};

export default ChatInterface;