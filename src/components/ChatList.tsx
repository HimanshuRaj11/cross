"use client"
import { useGlobalContext } from '@/context/contextProvider'
import axios from 'axios'
import { Date, Schema } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function ChatList({ UserList, setselectedChat, setShowList, setShowChat }: { UserList: any, setselectedChat: any, setShowList: any, setShowChat: any }) {
    const { User: { user } } = useSelector((state: any) => state.User);
    const { socket } = useGlobalContext()

    interface IChat {
        _id: Schema.Types.ObjectId,
        users: [
            _id: Schema.Types.ObjectId,
            username: string,
            name: string,
        ],
        createdAt: Date
    }
    const [ChatList, setChatList] = useState([])

    const FetchChatList = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/chat/ChatList`)
            setChatList(data?.chatList);
            return
        } catch (error) {
            return error
        }
    }
    const SelectChat = async (chat_id: any,) => {
        try {
            const res = await axios.post(`${baseUrl}/api/v1/chat`, { chat_id })
            if (res.data.success) {
                socket.emit("join-room", chat_id);
                setselectedChat(res.data.chat)
                setShowChat(true)
                setShowList(false)
            }
            return
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        FetchChatList()
    }, [])
    return (
        <div className='flex flex-col px-2 w-full overflow-y-auto h-[85%] sm:h-[88%]'>
            {
                UserList?.length > 0 ? (
                    <div className="">
                        {
                            UserList?.map((user: any, i: number) => {
                                return (
                                    <div key={i} onClick={() => SelectChat(user?._id)} className="relative  p-2 my-2 bg-gray-200 cursor-pointer flex items-center rounded-lg">
                                        <div className="mr-1 w-10">
                                            <img className="w-10 h-10 object-cover rounded-full" src={user.profilePic?.file ? user.profilePic?.file : avatarUrl} alt="User avatar" />
                                        </div>
                                        <div className="flex-1 w-auto">
                                            <div className="font-bold w-40 h-5 overflow-hidden ">{user.username}</div>
                                            <div className="text-sm text-gray-600 overflow-hidden w-40 h-5">Last message</div>
                                        </div>
                                        <p className="text-[10px] absolute bottom-1 right-1 text-gray-500 ml-1">12:45 PM</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="">
                        {
                            ChatList?.map((chat: any, i: number) => {
                                const OtherUser = chat?.users?.filter((C_user: any) => C_user?._id !== user?._id)?.[0] || {};
                                return (
                                    <div key={i} onClick={() => SelectChat(chat?._id)} className="relative  p-2 my-2 bg-gray-200 cursor-pointer flex items-center rounded-lg">
                                        <div className="mr-1 w-10">
                                            <img className="w-10 h-10 object-cover rounded-full" src={OtherUser.profilePic?.file ? OtherUser.profilePic?.file : avatarUrl} alt="User avatar" />
                                        </div>
                                        <div className="flex-1 w-auto">
                                            <div className="font-bold w-40 h-5 overflow-hidden ">{OtherUser.username}</div>
                                            <div className="text-sm text-gray-600 overflow-hidden w-40 h-5">Last message</div>
                                        </div>
                                        <p className="text-[10px] absolute bottom-1 right-1 text-gray-500 ml-1">12:45 PM</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
