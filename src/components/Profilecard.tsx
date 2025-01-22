// components/UserProfileCard.tsx
"use client"
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
const banner = "https://wallpapers.com/images/hd/cyber-background-tp8xgh7o6vfh5kb8.jpg"
const ProfileCard = () => {
    const { User: { user } } = useSelector((state: any) => state.User);

    return (
        <div className=" max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
                <img src={user?.banner?.file ? user?.banner.file : banner} alt="Banner" className="w-full h-32 object-cover" />
                <img
                    src={user?.profilePic?.file ? user?.profilePic.file : avatarUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
                />
            </div>
            <div className="pt-16 px-6 pb-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-gray-500">@{user?.username}</p>
                    <p className="mt-2 text-gray-600">{user?.bio}</p>

                    <Link href={`/${user?.username}`} >
                        <Button className='mt-4'> Profile</Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProfileCard;