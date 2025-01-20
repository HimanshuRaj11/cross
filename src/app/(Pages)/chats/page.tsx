// components/ChatInterface.tsx
import React from 'react';
import { FaUser, FaPhone, FaVideo, FaEllipsisV, FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane } from 'react-icons/fa';

const ChatInterface: React.FC = () => {
    return (
        <div className="flex h-screen">
            {/* Left side: Chat list */}
            <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <ul>
                    {/* Example chat items */}
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Chat 1</li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Chat 2</li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Chat 3</li>
                </ul>
            </div>

            {/* Right side: Chat display */}
            <div className="w-[80vw] md:w-[80vw] flex flex-col">
                {/* Top: User details and action buttons */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
                    <div className="flex items-center">
                        <FaUser className="text-2xl mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">User Name</h3>
                            <p className="text-sm text-green-500">Online</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="p-2 hover:bg-gray-200 rounded-full"><FaPhone /></button>
                        <button className="p-2 hover:bg-gray-200 rounded-full"><FaVideo /></button>
                        <button className="p-2 hover:bg-gray-200 rounded-full"><FaEllipsisV /></button>
                    </div>
                </div>

                {/* Middle: Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {/* Example messages */}
                    <div className="mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg max-w-xs">Hello!</div>
                    </div>
                    <div className="mb-4 text-right">
                        <div className="bg-green-100 p-2 rounded-lg max-w-xs ml-auto">Hi there!</div>
                    </div>
                </div>

                {/* Bottom: Message input area */}
                <div className="p-4 bg-white border-t border-gray-300 flex items-center">
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaPaperclip /></button>
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaSmile /></button>
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaMicrophone /></button>
                    <input type="text" placeholder="Type a message" className="flex-1 mx-2 p-2 border border-gray-300 rounded-lg" />
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;