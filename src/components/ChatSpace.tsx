"use client"
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaEllipsisV, FaMicrophone, FaPaperclip, FaPaperPlane, FaPhone, FaSmile, FaUser, FaVideo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
export default function ChatSpace({ selectedChat }: { selectedChat: any }) {
    const { User: { user } } = useSelector((state: any) => state.User);
    const OtherUser = selectedChat?.users?.filter((C_user: any) => C_user._id !== user._id)?.[0] || {};

    const scrollableRef = useRef(null);

    const [Chats, setChats] = useState<any>()
    const messages = Chats?.messages;
    const [InputMessage, setInputMessage] = useState("");
    const [updatedMessages, setUpdatedMessages] = useState<any>([]);

    const handlemessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const sendMessage = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/chat/sendMessage`, { Chat_id: selectedChat._id, message: InputMessage });
            if (data.success) {
                setUpdatedMessages((prevMessages = []) => [...prevMessages, data.NewMessage]);
                setInputMessage("")
            }
            return;
        } catch (error) {
            return;
        }
    };
    const FetchMessages = async () => {
        try {
            const { data: { chat } } = await axios.post(`${baseUrl}/api/v1/chat/getMessage`, { Chat_id: selectedChat._id })
            setChats(chat);
            return
        } catch (error) {
            return
        }
    }
    const scrollToTop = () => {
        if (scrollableRef.current) {
            scrollableRef.current = scrollableRef.current;
        }
    };
    useEffect(() => {
        FetchMessages()
    }, [selectedChat])

    return (
        <div className="w-full h-full  md:h-screen flex flex-col">

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

            <div className=" relative  h-[90vh] bg-[url(/bg.jpg)]  bg-cover bg-center  ">
                <div className=" bottom-0 px-3 absolute w-full flex h-[100%] flex-col overflow-y-scroll" ref={scrollableRef}>

                    {
                        messages && messages?.map((message: any, i: number) => {
                            const MessageTime = moment(message.createdAt).format('HH:mm');

                            const currentDate = moment().startOf('date');
                            const createdAtDate = moment(message.createdAt).startOf('date');

                            let MessageDay;
                            if (createdAtDate.isSame(currentDate, 'day')) {
                                MessageDay = 'today';
                            } else if (createdAtDate.isSame(currentDate.subtract(1, 'days'), 'day')) {
                                MessageDay = 'yesterday';
                            } else {
                                MessageDay = moment(message.createdAt).format('YYYY-MM-DD');
                            }
                            return (
                                <div key={i} className=" m-1">

                                    {/* <h1>{MessageDay}</h1> */}
                                    <div className={`${message.user._id == user._id ? "float-right" : "float-left"} `}>
                                        <div className={`${message.user._id == user._id ? "bg-green-300" : "bg-blue-200"}  p-1 px-3 rounded-lg max-w-xs flex flex-row`}>
                                            {
                                                message.user._id != user._id && <img className="w-10 h-10 mr-2 object-cover rounded-full" src={message.user.profilePic?.file ? message.user.profilePic?.file : avatarUrl} alt="User avatar" />
                                            }
                                            <div className="flex flex-col">
                                                {/* <p className='text-[10px]'>{message.user.username}</p> */}
                                                <p> {message.message}</p>
                                                <p className={`text-[10px] ${message.user._id == user._id ? "float-right" : "float-left"}`}> {MessageTime}</p>
                                            </div>
                                            {message.user._id == user._id && <img className="ml-2 w-10 h-10 object-cover rounded-full" src={message.user.profilePic?.file ? message.user.profilePic?.file : avatarUrl} alt="User avatar" />}

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        updatedMessages && updatedMessages?.map((message: any, i: number) => {
                            const MessageTime = moment(message.createdAt).format('HH:mm');

                            const currentDate = moment().startOf('date');
                            const createdAtDate = moment(message.createdAt).startOf('date');

                            let MessageDay;
                            if (createdAtDate.isSame(currentDate, 'day')) {
                                MessageDay = 'today';
                            } else if (createdAtDate.isSame(currentDate.subtract(1, 'days'), 'day')) {
                                MessageDay = 'yesterday';
                            } else {
                                MessageDay = moment(message.createdAt).format('YYYY-MM-DD');
                            }
                            return (
                                <div key={i} className=" m-1">

                                    {/* <h1>{MessageDay}</h1> */}
                                    <div className={`${message.user._id == user._id ? "float-right" : "float-left"} `}>
                                        <div className={`${message.user._id == user._id ? "bg-green-300" : "bg-blue-200"}  p-2 rounded-lg max-w-xs flex flex-row`}>
                                            {
                                                message.user._id != user._id && <img className="w-10 h-10 mr-2 object-cover rounded-full" src={message.user.profilePic?.file ? message.user.profilePic?.file : avatarUrl} alt="User avatar" />
                                            }
                                            <div className="flex flex-col">
                                                {/* <p className='text-[10px]'>{message.user.username}</p> */}
                                                <p> {message.message}</p>
                                                <p className={`text-[10px] ${message.user._id == user._id ? "float-right" : "float-left"}`}> {MessageTime}</p>
                                            </div>
                                            {message.user._id == user._id && <img className="ml-2 w-10 h-10 object-cover rounded-full" src={message.user.profilePic?.file ? message.user.profilePic?.file : avatarUrl} alt="User avatar" />}

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>



            <div className="p-4 bg-white border-t border-gray-300 flex items-center">
                <button className="p-2 hover:bg-gray-200 rounded-full"><FaPaperclip /></button>
                <button className="p-2 hover:bg-gray-200 rounded-full"><FaSmile /></button>
                <button onClick={scrollToTop} className="p-2 hover:bg-gray-200 rounded-full"><FaMicrophone /></button>
                <input value={InputMessage} onKeyDown={(e) => e.key === "Enter" && sendMessage()} onChange={handlemessageChange} type="text" placeholder="Type a message" className="flex-1 mx-2 p-2 border border-gray-300 rounded-lg" />
                <button className="p-2 hover:bg-gray-200 rounded-full" onClick={sendMessage}><FaPaperPlane /></button>
            </div>
        </div>
    )
}
