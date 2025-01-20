// components/UserDetails.tsx
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from './ui/button';

interface UserDetailsProps {
    bannerUrl: string;
    profilePictureUrl: string;
    fullName: string;
    username: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
    location: string;
    joinedDate: string;
    website: string;
    isFollowing: boolean;
    onFollowToggle: () => void;
    onMessage: () => void;
}

const EditUserDetails = ({
    bannerUrl,
    profilePictureUrl,
    fullName,
    username,
    bio,
    followers,
    following,
    posts,
    location,
    joinedDate,
    website,
    isFollowing,
    onFollowToggle,
    onMessage,
}: UserDetailsProps) => {
    const [editableData, setEditableData] = useState({
        bannerUrl,
        profilePictureUrl,
        fullName,
        username,
        bio,
        location,
        website,
    });

    const handleEditChange = (field: string, value: string) => {
        setEditableData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <div className="relative">
                <img src={editableData.bannerUrl} alt="Banner" className="w-full h-48 object-cover" />
                <img
                    src={editableData.profilePictureUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                />
                <Button className="absolute top-4 right-4 ">
                    <span>Edit</span> <FaEdit size={20} />
                </Button>
            </div>
            <div className="pt-20 px-6 pb-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        <input
                            type="text"
                            value={editableData.fullName}
                            onChange={(e) => handleEditChange('fullName', e.target.value)}
                            className="border-none text-center"
                        />
                        <FaEdit size={16} className="inline ml-2" />
                    </h2>
                    <p className="text-gray-500">
                        @<input
                            type="text"
                            value={editableData.username}
                            onChange={(e) => handleEditChange('username', e.target.value)}
                            className="border-none text-center"
                        />
                        <FaEdit size={16} className="inline ml-2" />
                    </p>
                    <p className="mt-2 text-gray-600">
                        <textarea
                            value={editableData.bio}
                            onChange={(e) => handleEditChange('bio', e.target.value)}
                            className="border-none text-center"
                        />
                        <FaEdit size={16} className="inline ml-2" />
                    </p>
                </div>
                <div className="flex justify-around mt-4 text-center">
                    <div>
                        <p className="text-lg font-bold">{followers}</p>
                        <p className="text-gray-500">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{following}</p>
                        <p className="text-gray-500">Following</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{posts}</p>
                        <p className="text-gray-500">Posts</p>
                    </div>
                </div>
                <div className="flex justify-around mt-4">
                    <button
                        onClick={onFollowToggle}
                        className={`px-4 py-2 rounded-full font-semibold ${isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                            } hover:opacity-90`}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                    <button
                        onClick={onMessage}
                        className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300"
                    >
                        Message
                    </button>
                </div>
                <div className="mt-4 text-center text-gray-600">
                    <p>
                        📍 <input
                            type="text"
                            value={editableData.location}
                            onChange={(e) => handleEditChange('location', e.target.value)}
                            className="border-none text-center"
                        />
                        <FaEdit size={16} className="inline ml-2" />
                    </p>
                    <p>📅 Joined {joinedDate}</p>
                    <p>
                        🔗 <input
                            type="text"
                            value={editableData.website}
                            onChange={(e) => handleEditChange('website', e.target.value)}
                            className="border-none text-center"
                        />
                        <FaEdit size={16} className="inline ml-2" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditUserDetails;