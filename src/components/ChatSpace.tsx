"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaEllipsisV, FaMicrophone, FaPaperclip, FaPaperPlane, FaPhone, FaSmile, FaUser, FaVideo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
export default function ChatSpace({ selectedChat }: { selectedChat: any }) {
    const { User: { user } } = useSelector((state: any) => state.User);
    const OtherUser = selectedChat?.users?.filter((C_user: any) => C_user._id !== user._id)?.[0] || {};

    const [messages, setmessages] = useState('')

    const [InputMessage, setInputMessage] = useState("")
    const handlemessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value)
    }
    const sendMessage = async () => {
        try {
            await axios.post(`${baseUrl}/api/v1/chat/sendMessage`, { Chat_id: selectedChat._id, message: InputMessage })
            return
        } catch (error) {
            return
        }
    }
    const FetchMessages = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/chat/getMessage`, { Chat_id: selectedChat._id })
            console.log(data);
            return
        } catch (error) {
            return
        }
    }
    useEffect(() => {
        FetchMessages()
    }, [])

    return (
        <div className="w-[80vw] md:w-[80vw] flex flex-col">

            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
                <div className="flex items-center">
                    <Link href={OtherUser?.username}>
                        <img className="w-10 h-10 object-cover rounded-full" src={OtherUser.profilePic?.file ? OtherUser.profilePic?.file : avatarUrl} alt="User avatar" />
                    </Link>
                    <div>
                        <h3 className="text-lg font-bold leading-3">{OtherUser.username}</h3>
                        {/* <h3 className="text-sm font-bold">{OtherUser.name}</h3> */}
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaPhone /></button>
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaVideo /></button>
                    <button className="p-2 hover:bg-gray-200 rounded-full"><FaEllipsisV /></button>
                </div>
            </div>

            {/*  Message Room*/}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">

                <div className="mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg max-w-xs">Hello!</div>
                </div>

                <div className="mb-4 text-right">
                    <div className="bg-green-100 p-2 rounded-lg max-w-xs ml-auto">Hi there!</div>
                </div>
            </div>
            {/*  */}

            <div className="p-4 bg-white border-t border-gray-300 flex items-center">
                <button className="p-2 hover:bg-gray-200 rounded-full"><FaPaperclip /></button>
                <button className="p-2 hover:bg-gray-200 rounded-full"><FaSmile /></button>
                <button className="p-2 hover:bg-gray-200 rounded-full"><FaMicrophone /></button>
                <input value={InputMessage} onKeyDown={(e) => e.key === "Enter" && sendMessage()} onChange={handlemessageChange} type="text" placeholder="Type a message" className="flex-1 mx-2 p-2 border border-gray-300 rounded-lg" />
                <button className="p-2 hover:bg-gray-200 rounded-full" onClick={sendMessage}><FaPaperPlane /></button>
            </div>
        </div>
    )
}
