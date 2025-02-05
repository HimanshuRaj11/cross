// pages/profile.tsx
"use client"
import AboutSection from '@/components/AboutSection';
import Tabs from '@/components/Tabs';
import axios from 'axios';
import { usePathname, redirect } from 'next/navigation';
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
import MessageBtn from '@/components/MessageBtn';
import { MdClose } from 'react-icons/md';
import Searchbox from '@/components/Search';
import Link from 'next/link';
import { BiUserPlus } from 'react-icons/bi';
import { FaCamera } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';




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

    const posts = PathUser?.posts

    const selfUser = PathUser?._id == user?._id

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


    const [ShowUserList, setShowUserList] = useState(false)
    const [followersList, setfollowersList] = useState<any>()

    const ShowFollowers = async () => {
        try {
            if (PathUser._id) {
                const { data: { followers } } = await axios.post(`${baseUrl}/api/v1/user/getFollower`, { user_id: PathUser._id })
                if (followers) {
                    setfollowersList(followers.followers);
                    setShowUserList(true)
                }
            }


            return
        } catch (error) {
            return
        }
    }
    const ShowFollowings = async () => {
        try {
            if (PathUser._id) {

                const { data: { followings } } = await axios.post(`${baseUrl}/api/v1/user/getFollowing`, { user_id: PathUser._id })

                if (followings) {
                    setfollowersList(followings.followings)
                    setShowUserList(true)
                }
            }

            return
        } catch (error) {
            return
        }
    }

    const handleClosePopOver = () => {
        setShowUserList(false)
    }
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [ProfilePic, SetProfilePic] = useState<string | null>(null);
    const [BannerPic, SetBannerPic] = useState<string | null>(null);
    const OnChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const File = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(File)
            reader.onloadend = () => {
                SetProfilePic(reader.result as string)
            }
        }


    }
    const OnChangeBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const File = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(File)
            reader.onloadend = () => {
                SetBannerPic(reader.result as string)
            }
        }


    }

    const handleSubmitProfile = async () => {
        try {
            setLoading(true)
            setTimeout(() => setProgress(66), 2000)
            await axios.post(`${baseUrl}/api/v1/user/update/profilePic`, { ProfileImage: ProfilePic })

            setProgress(100)
            setLoading(false)
            SetProfilePic(null)
            return
        } catch (error) {
            toast.error(`${error}`, {
                position: "top-right"
            })
            return error
        }
    }

    useEffect(() => {
        fetchUsername()
    }, [])
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Users Followers and followings */}
            {
                ShowUserList && (
                    <div className="fixed z-50 h-full sm:h-full sm:top-0 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center overflow-hidden" onClick={handleClosePopOver}>
                        <button className="absolute top-2 right-2 rounded-full p-2 bg-slate-200" onClick={handleClosePopOver}>
                            <MdClose className='size-8 font-bold' />
                        </button>
                        <div className="max-w-lg mx-auto p-1 h-[80vh] w-[90%] ">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Search..."
                                // value={query}
                                // onChange={handleChange}
                                />

                            </div>
                            <div className="space-y-4 p-2  overflow-y-scroll scrollbar-hide bg-slate-100 rounded-lg min-h-[80vh]">
                                {
                                    followersList?.map((result: any, index: number) => (
                                        <UsersList key={index} result={result} followed={followed} followhandler={followhandler} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            {/* user details or Profile */}

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">


                <div className="relative">
                    <img src={PathUser?.banner ? PathUser?.banner : banner} alt="Banner" className="w-full h-48 object-cover" />
                    {
                        selfUser && <FaCamera className="absolute p-1 rounded-md size-8 bg-slate-500 top-2 right-2 text-white" />
                    }
                    <img
                        src={PathUser?.profilePic ? PathUser?.profilePic : avatarUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                    />
                    {
                        ProfilePic ? (
                            <div className="">
                                <img
                                    src={ProfilePic}
                                    alt="InputProfile"
                                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                                />
                                <Button onClick={handleSubmitProfile}>Upload</Button>
                            </div>
                        ) : (
                            <img
                                src={PathUser?.profilePic ? PathUser?.profilePic.file : avatarUrl}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                            />
                        )
                    }
                    {
                        selfUser && (
                            <div className="absolute  left-1/2 transform -translate-x-1/2 -bottom-16">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={OnChangeProfile}
                                    name="files"
                                    id="ProfilePicUpload"
                                />
                                <label htmlFor="ProfilePicUpload" className="cursor-pointer">
                                    <span className=" cursor-pointer text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                                        <FaCamera className="size-8" />
                                    </span>
                                </label>
                            </div>
                        )
                    }
                    {
                        loading && <Progress value={progress} className="w-[60%]" />

                    }

                    {/* {
                        ProfilePic && (
                            <div className="">
                                <img
                                    src={ProfilePic}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                                />
                                <Button onClick={handleSubmitProfile}>Upload</Button>
                            </div>
                        )
                    } */}
                </div>
                <div className="pt-20 px-6 pb-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{PathUser?.name}</h2>
                        <p className="text-gray-500">@{PathUser?.username}</p>
                        <p className="mt-2 text-gray-600">{PathUser?.bio}</p>
                    </div>
                    <div className="flex justify-around mt-4 text-center">
                        <div onClick={ShowFollowers} className='bg-slate-300 p-2 rounded-lg w-24 cursor-pointer hover:bg-slate-400'>
                            <p className="text-lg font-bold">{followers}</p>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div onClick={ShowFollowings} className='bg-slate-300 p-2 rounded-lg w-24 cursor-pointer hover:bg-slate-400'>
                            <p className="text-lg font-bold">{followings}</p>
                            <p className="text-gray-600">Followings</p>
                        </div>
                        <div className='bg-slate-300 p-2 rounded-lg w-24 cursor-pointer hover:bg-slate-400'>
                            <p className="text-lg font-bold">{postLength}</p>
                            <p className="text-gray-600">Posts</p>
                        </div>
                    </div>
                    {
                        !selfUser && (
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

                                <MessageBtn OtherUser={PathUser?._id} />
                            </div>
                        )
                    }
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
                            posts?.map((post: IPost, i: number) => <UserPostscard key={i} post={post} selfUser={selfUser} />)

                        }
                    </div>
                )}

                {activeTab === 'About' && <AboutSection {...aboutData} />}
            </div>
        </div>
    );
};

export default ProfilePage;



const UsersList = ({ result, followed, followhandler }: { result: any, followed: boolean, followhandler: any }) => {
    return (
        <div className='flex items-center p-2 rounded-md bg-slate-300 hover:bg-slate-100 my-2 w-full'>
            <Link href={result ? result?.username : ""}>
                <img className="w-10 h-10 object-cover rounded-full" src={result?.profilePic?.file ? result?.profilePic?.file : avatarUrl} alt="User avatar" />
            </Link>

            <div className="mx-3 ">
                <Link className='flex flex-col' href={result ? result?.username : ""}>
                    <h2 className="text-gray-800 font-semibold">{result?.name}</h2>
                    <h2 className="text-gray-600 text-[13.5px] font-semibold">@{result?.username}</h2>
                </Link>
            </div>
            {
                !followed ?
                    <div className='w-auto' onClick={() => followhandler(result?._id)}>
                        <div className=' flex flex-row justify-center items-center text-blue-500 font-semibold border-2 border-blue-500 rounded-2xl px-2 hover:text-white hover:bg-blue-500'>
                            Follow
                            <BiUserPlus className=' font-semibold ml-1 text-2xl' />
                        </div>
                    </div>
                    :
                    ""
            }
        </div>
    )
}