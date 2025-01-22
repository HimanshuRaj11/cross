// pages/profile.tsx
"use client"
import AboutSection from '@/components/AboutSection';
import Tabs from '@/components/Tabs';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
const banner = "https://wallpapers.com/images/hd/cyber-background-tp8xgh7o6vfh5kb8.jpg"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
import moment from 'moment';
import UserPostscard from '@/components/UserPostscard';
import { Schema } from 'mongoose';
import { IPost } from '@/models/post.model';
import { toast } from 'react-toastify';




const ProfilePage: React.FC = () => {
    const { User: { user } } = useSelector((state: any) => state.User);


    const [activeTab, setActiveTab] = useState('Posts');

    const pathname = usePathname()

    const [PathUser, setPathUser] = useState<any>({})

    const location = PathUser?.country + ", " + PathUser?.city
    const followers = PathUser?.followers?.length
    const followings = PathUser?.followings?.length
    const postLength = PathUser?.posts?.length
    const followed = user?.followings?.includes(PathUser?._id)
    console.log(followed);

    const posts = PathUser?.posts


    // const savedPosts = PathUser?.savedPost

    const aboutData = {
        email: "",
        hobbies: ['Reading', 'Traveling', 'Coding'],
        professionalInfo: "",
    };

    const fetchUsername = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/v1/user${pathname}`)
            setPathUser(res.data.user);
        } catch (error) {
            throw error
        }
    }
    const followhandler = async (followUserId: Schema.Types.ObjectId) => {
        try {

            await axios.post(`${baseUrl}/api/v1/user/follow`, { followUserId })
            toast.success(`You Follow ${PathUser?.username}`)
            return
        } catch (error) {
            return error
        }
    }
    const unfollowhandler = async (unfollowUserId: Schema.Types.ObjectId) => {
        try {

            await axios.post(`${baseUrl}/api/v1/user/unfollow`, { unfollowUserId })
            toast.success(`You UnFollow ${PathUser?.username}`)
            return
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        fetchUsername()
    }, [])
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                <div className="relative">
                    <img src={PathUser?.banner ? PathUser?.banner : banner} alt="Banner" className="w-full h-48 object-cover" />
                    <img
                        src={PathUser?.profilePic ? PathUser?.profilePic : avatarUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                    />
                </div>
                <div className="pt-20 px-6 pb-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{PathUser?.name}</h2>
                        <p className="text-gray-500">@{PathUser?.username}</p>
                        <p className="mt-2 text-gray-600">{PathUser?.bio}</p>
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
                            <p className="text-lg font-bold">{postLength}</p>
                            <p className="text-gray-500">Posts</p>
                        </div>
                    </div>
                    <div className="flex justify-around mt-4">
                        {

                            followed ? (
                                <button
                                    onClick={() => unfollowhandler(PathUser?._id)}
                                    className={`px-4 py-2 rounded-full font-semibold bg-red-500 text-white hover:opacity-90`}
                                >
                                    Unfollow
                                </button>

                            ) :
                                <button
                                    onClick={() => followhandler(PathUser?._id)}
                                    className={`px-4 py-2 rounded-full font-semibold bg-blue-500 text-white hover:opacity-90`}
                                >
                                    Follow
                                </button>
                        }

                        <button
                            // onClick={onMessage}
                            className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300"
                        >
                            Message
                        </button>
                    </div>
                    <div className="mt-4 text-center text-gray-600">
                        {PathUser?.country ? <p>📍 {location} </p> : ""}
                        <p>📅 Joined  {moment(PathUser?.createdAt).format('DD MMM YYYY')}</p>
                        {
                            PathUser?.website ?
                                <p>
                                    🔗 <a href={PathUser?.website} className="text-blue-500 hover:underline">{PathUser?.website}</a>
                                </p>
                                : ""
                        }
                    </div>
                </div>
            </div>

            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-4xl mx-auto mt-6">
                {activeTab === 'Posts' && (
                    <div className="flex justify-center flex-wrap">
                        {
                            posts?.map((post: IPost, i: number) => <UserPostscard key={i} post={post} />)

                        }
                    </div>
                )}

                {activeTab === 'About' && <AboutSection {...aboutData} />}
            </div>
        </div>
    );
};

export default ProfilePage;