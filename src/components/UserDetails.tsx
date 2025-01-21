// components/UserDetails.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { IUser } from '@/models/user.model';
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
const banner = "https://wallpapers.com/images/hd/cyber-background-tp8xgh7o6vfh5kb8.jpg"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


const UserDetails = () => {
    const { user } = useSelector((state: { user: IUser }) => state);

    const pathname = usePathname()
    const [PathUser, setPathUser] = useState<any>({})

    const location = user?.country + ", " + user?.city
    const followers = user?.followers?.length
    const followings = user?.followings?.length
    const posts = user?.posts?.length

    // for edit folow or message btn have to check username first and get id of that and match logedin user id
    const fetchUsername = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user${pathname}`)
            setPathUser(res.data.user);
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUsername()
    }, [])
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <div className="relative">
                <img src={user?.banner?.file ? user?.banner.file : banner} alt="Banner" className="w-full h-48 object-cover" />
                <img
                    src={user?.profilePic?.file ? user?.profilePic.file : avatarUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                />
                {
                    user?._id == PathUser?._id ?
                        (<Button className="absolute top-4 right-4 ">
                            <span>Edit</span> <FaEdit size={20} />
                        </Button>) : ("")
                }


            </div>
            <div className="pt-20 px-6 pb-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-gray-500">@{user?.username}</p>
                    <p className="mt-2 text-gray-600">{user?.bio}</p>
                </div>
                <div className="flex justify-around mt-4 text-center">
                    <div>
                        <p className="text-lg font-bold">{followers}</p>
                        <p className="text-gray-500">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{followings}</p>
                        <p className="text-gray-500">Followings</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{posts}</p>
                        <p className="text-gray-500">Posts</p>
                    </div>
                </div>
                <div className="flex justify-around mt-4">
                    {/* <button
                        onClick={onFollowToggle}
                        className={`px-4 py-2 rounded-full font-semibold ${isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                            } hover:opacity-90`}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button> */}
                    <button
                        // onClick={onMessage}
                        className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300"
                    >
                        Message
                    </button>
                </div>
                <div className="mt-4 text-center text-gray-600">
                    <p>📍 {location}</p>
                    {/* <p>📅 Joined {user?.createdAt}</p> */}
                    <p>
                        {/* 🔗 <a href={user?.website} className="text-blue-500 hover:underline">{user?.website}</a> */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;