"use client"
import React, { useState, useEffect } from 'react';

interface Post {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
}

const Explore: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            const fetchedPosts = Array.from({ length: 10 }, (_, index) => ({
                id: index,
                imageUrl: `https://picsum.photos/200/300?random=${index}`,
                title: `Post Title ${index + 1}`,
                description: `Description for post ${index + 1}`,
            }));
            setPosts(fetchedPosts);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
                ))
                : posts.map((post) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p className="text-gray-600">{post.description}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Explore;