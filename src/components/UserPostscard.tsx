"use client"
import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShareAlt } from 'react-icons/fa';
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"
import { useSelector } from 'react-redux';
function UserPostscard({ post }: { post: any }) {
    const { User: { user } } = useSelector((state: any) => state.User);
    const FileLength = post?.files.length
    const liked = post.likes.includes(user?._id);
    const likeOrDislikeHandler = async (Post_id: any) => {
        try {
            const action = liked ? 'dislike' : 'like';

            await axios.post(`${baseUrl}/api/v1/post/${action}`, { Post_id }, { withCredentials: true })

            return
        } catch (error) {
            return error
        }
    }
    return (
        <div className="mx-auto w-full md:w-[80%] lg:w-[70%] cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden my-4 transition-transform transform hover:scale-101">


            <div className="px-4 py-2">
                <p className="text-gray-700 text-sm">{post?.content}</p>
                <p className="text-gray-700 text-sm">{post?.location}</p>
            </div>

            <div>
                <Carousel className='relative'>

                    <CarouselContent>

                        {
                            post?.files?.map((file: any, index: number) => {
                                return (
                                    <CarouselItem key={index} >
                                        <div className="p-4 flex justify-center ">
                                            <div className="carousel-item w-full relative">
                                                {
                                                    FileLength !== 1 ?
                                                        <span className='absolute rounded-md bg-gray-300 opacity-80 top-2 right-5'>{index + 1}/{FileLength}</span> : ""
                                                }
                                                <img className="w-[100%] max-h-[30rem] object-contain rounded-lg" src={file?.url} alt={"userDetails?.username"} />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                );
                            })
                        }
                    </CarouselContent>
                    {
                        FileLength !== 1 ?
                            <>
                                <CarouselPrevious className="left-4 " />
                                <CarouselNext className="right-4" />
                            </>
                            : ""
                    }
                    {/* <CarouselPrevious className='absolute top-[50%] left-[-1px]' />
                                <CarouselNext className='absolute top-[50%] right-[-1px]' /> */}
                </Carousel>
            </div>




            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <div className="flex items-center">
                    <button onClick={() => likeOrDislikeHandler(post._id)} className={`flex items-center  hover:text-blue-500 ${liked ? "text-blue-500" : "text-gray-600"}`}>
                        <FaThumbsUp className="w-5 h-5 mr-1" />
                        <span>{post?.likes.length}</span>
                    </button>

                    <button className="flex items-center ml-4 text-gray-600 hover:text-blue-500">
                        <FaComment className="w-5 h-5 mr-1" />
                        <span>{post?.comments.length}</span>
                    </button>
                </div>


                <button className="text-gray-600 hover:text-blue-500">
                    <FaShareAlt className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default UserPostscard
