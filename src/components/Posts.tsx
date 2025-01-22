// components/PostCard.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostsCard';
import PostSkeleton from './skeleton/PostSkeleton';

const Posts = () => {
    const { Posts: { Posts } } = useSelector((state: any) => state)
    const PostList = Posts?.posts
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
                PostList ? (
                    PostList?.map((post: any, i: number) => <PostCard key={i} post={post} />)

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