// components/ChatInterface.tsx
'use client'
import ChatList from '@/components/ChatList';
import ChatSpace from '@/components/ChatSpace';
import React, { useState } from 'react';

const ChatInterface: React.FC = () => {
    const [selectedChat, setselectedChat] = useState()

    return (
        <div className="flex h-screen">

            <div className="w-[28%] bg-gray-100 p-2 border-r border-gray-300 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <ChatList setselectedChat={setselectedChat} />

            </div>
            {
                selectedChat && <ChatSpace selectedChat={selectedChat} />
            }

        </div>
    );
};

export default ChatInterface;