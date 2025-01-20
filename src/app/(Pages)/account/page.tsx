// pages/profile.tsx
"use client"
import AboutSection from '@/components/AboutSection';
import EditUserDetails from '@/components/EditUserDetails';
import Posts from '@/components/Posts';
import PostCard from '@/components/PostsCard';
import Tabs from '@/components/Tabs';
import UserDetails from '@/components/UserDetails';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Posts');

    const { User: { user } } = useSelector((state: any) => state.User);

    const posts = [
        {
            imageUrl: 'https://pixlr.com/images/generator/photo-generator.webp',
            title: 'Post Title 1',
            description: 'Short description of the post.',
            timestamp: '2 hours ago',
        },
        // Add more posts as needed
    ];

    const savedPosts = [
        {
            imageUrl: 'https://pixlr.com/images/generator/photo-generator.webp',
            title: 'Saved Post Title 1',
            description: 'Short description of the saved post.',
            timestamp: '1 day ago',
        },
        // Add more saved posts as needed
    ];

    const aboutData = {
        email: 'johndoe@example.com',
        hobbies: ['Reading', 'Traveling', 'Coding'],
        professionalInfo: 'Software Developer at XYZ Corp.',
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <UserDetails />
            {/* <EditUserDetails {...userData} /> */}

            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="max-w-4xl mx-auto mt-6">
                {activeTab === 'Posts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {posts.map((post, index) => (
                            <Posts key={index} {...post} />
                        ))}
                    </div>
                )}
                {activeTab === 'Saved Posts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedPosts.map((post, index) => (
                            <Posts key={index} {...post} />
                        ))}
                    </div>
                )}
                {activeTab === 'About' && <AboutSection {...aboutData} />}
            </div>
        </div>
    );
};

export default ProfilePage;