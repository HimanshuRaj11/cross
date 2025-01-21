// components/PostCard.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostsCard';
import { IPostExt } from '@/models/post.model';

const Posts = () => {
    const { Posts: { Posts } } = useSelector((state: any) => state)
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
                Posts?.posts?.map((post: IPostExt, i: number) => <PostCard key={i} post={post} />)
            }
        </div>
    );
};

export default Posts;