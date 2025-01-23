// components/PostCard.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostsCard';
import PostSkeleton from './skeleton/PostSkeleton';

const Posts = () => {
    const { posts } = useSelector((state: any) => state.Posts.Posts)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
                posts ? (
                    posts?.map((post: any, i: number) => <PostCard key={i} post={post} />)

                ) : (
                    <div className="w-full">
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </div>

                )
            }
        </div>
    );
};

export default Posts;