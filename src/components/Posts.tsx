// components/PostCard.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';

import PostCard from './PostsCard';

const Posts = () => {
    const { Posts: { posts } } = useSelector((state: any) => state.Posts)

    return (

        <div className="w-full flex flex-col justify-center items-center">
            {
                posts?.map((post: any) => <PostCard key={post._id} post={post} />)

            }
        </div>


    );
};

export default Posts;