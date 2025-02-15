import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"

import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/contextProvider';
import { Progress } from './ui/progress';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const CreatePost: React.FC = () => {
    const { setPopover, setCreatePostBtn, } = useGlobalContext()
    const [progress, setProgress] = useState(0)
    const [createPostTab, setCreatePosttab] = useState(true)

    const handleClosePopOver = () => {
        setPopover(false)
        setCreatePostBtn(false)
    }
    const [loading, setLoading] = useState(false)


    // Function to create Post
    const [PostData, setPostdata] = useState({
        caption: "",
        location: ""
    })
    const handleInputChange = (e: any) => {
        let { name, value } = e.target;
        setPostdata((preVal) => {
            return { ...preVal, [name]: value }
        })
        console.log(PostData);

    }
    const [PostFiles, setFiles] = useState<string[]>([]);
    const OnchangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFiles((prevFiles) => [...prevFiles, reader.result as string]);
            };
        }
    };
    const handlePostSubmit = async () => {

        try {
            setLoading(true)
            setTimeout(() => setProgress(66), 2000)
            const res = await axios.post(`${baseUrl}/api/v1/post/create`, { PostFiles, PostData });
            setPostdata({
                caption: "",
                location: ""
            })
            setFiles([])
            toast.success("Post Created ", {
                position: "top-right"
            })
            setProgress(100)
            setLoading(false)
            handleClosePopOver()
            return

        } catch (error) {
            toast.error(`${error}`, {
                position: "top-right"
            })

            return

        }
    }

    // Functions to create reels

    const [Reelfile, setReelsFile] = useState<string[]>([])
    const OnchangeReelsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setReelsFile((prevFiles) => [...prevFiles, reader.result as string]);
            };
        }
    };
    const handleReelSubmit = async () => {

        try {

            // setLoading(true)
            // setTimeout(() => setProgress(66), 2000)
            // const res = await axios.post(`${baseUrl}/api/v1/post/create`, { PostFiles, PostData });
            // setPostdata({
            //     caption: "",
            //     location: ""
            // })
            // setFiles([])
            // toast.success("Post Created ", {
            //     position: "top-right"
            // })
            // setProgress(100)
            // setLoading(false)
            // handleClosePopOver()
            return

        } catch (error) {
            toast.error(`${error}`, {
                position: "top-right"
            })

            return

        }
    }
    return (

        <div className=" flex flex-col justify-center items-center w-full min-h-[80vh] overflow-y-scroll md:overflow-hidden ">

            {
                loading ? <Progress value={progress} className="w-[60%]" />
                    :
                    <div className="flex flex-col relative items-center  w-[95%] h-[33rem] box-shadow rounded-lg">
                        <div defaultValue="post" className="w-full justify-center items-center flex-col h-full">

                            <div className=''>
                                <span onClick={() => setCreatePosttab(true)} className={`dark:text-light-text text-dark-text text-xl p-2 m-2 cursor-pointer ${createPostTab ? "border bg-slate-400 rounded-md  " : ""} `}>POST</span>
                                <span onClick={() => setCreatePosttab(false)} className={`dark:text-light-text text-dark-text text-xl p-2 m-2 cursor-pointer ${createPostTab ? "" : "border bg-slate-400 rounded-md "} `}>REELS</span>
                            </div>


                            {
                                createPostTab ? (
                                    <div className='w-full flex flex-col md:h-[90%] justify-between'>
                                        <div className="flex flex-col md:flex-row items-center justify-around w-full">
                                            <div className=" font-bold py-2 w-full md:w-[48%] md:h-[26rem] md:mt-10 px-4 rounded flex justify-center items-center">
                                                {
                                                    PostFiles && PostFiles.length > 0 ? (
                                                        <div className="flex justify-center items-center relative">
                                                            <div className="carousel w-full">
                                                                <Carousel>
                                                                    <CarouselContent>
                                                                        {PostFiles.map((file, index) => (
                                                                            <CarouselItem key={index}>
                                                                                <div className="carousel-item w-full">
                                                                                    <img src={file} alt={`file-${index}`} className="w-full" />
                                                                                </div>
                                                                            </CarouselItem>

                                                                        ))}
                                                                    </CarouselContent>
                                                                    <CarouselPrevious className="left-4 " />
                                                                    <CarouselNext className="right-4" />
                                                                </Carousel>
                                                            </div>
                                                            <span className='absolute -bottom-10 right-2'>
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    onChange={OnchangeFileHandler}
                                                                    name="files"
                                                                    id="file-upload"
                                                                    multiple
                                                                />
                                                                <label htmlFor="file-upload" className="cursor-pointer">
                                                                    <span className="dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                                                        <FiPlusCircle className="size-16" />
                                                                    </span>
                                                                </label>
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                onChange={OnchangeFileHandler}
                                                                name="files"
                                                                id="file-upload"
                                                                multiple
                                                            />
                                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                                <span className="dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                                                    <FiPlusCircle className="size-64" />
                                                                </span>
                                                            </label>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <div className=" md:w-[48%] w-full md:h-[26rem]">
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Content
                                                    </h3>
                                                    <div className="mt-2">
                                                        <textarea
                                                            value={PostData.caption}
                                                            onChange={handleInputChange}
                                                            name="caption"
                                                            placeholder='caption..'
                                                            className="min-h-[8rem] max-h-[8rem] p-2 size-96 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Location
                                                    </h3>
                                                    <div className="mt-2">
                                                        <input
                                                            value={PostData.location}
                                                            onChange={handleInputChange}
                                                            type='text'
                                                            name="location"
                                                            placeholder='Location'
                                                            className=" p-2 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Music
                                                    </h3>
                                                    <div className="mt-2">
                                                        thik hai rahne do abhi..
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <Button onClick={handlePostSubmit}>Post</Button>
                                    </div>

                                ) : (
                                    // {/* Reels uploadd Component */ }

                                    <div className='w-full flex flex-col md:h-[90%] justify-between'>
                                        <div className="flex flex-col md:flex-row justify-between items-center h-full">
                                            <div className="w-full md:w-[49%] flex justify-center items-center">
                                                {
                                                    Reelfile && Reelfile.length > 0 ? (
                                                        <div className="flex justify-center items-center relative">
                                                            <div className="carousel w-full">
                                                                {Reelfile.map((file, index) => (
                                                                    <div key={index} className="carousel-item object-contain flex justify-center items-center h-[55vh]">
                                                                        <video src={file} className='h-full' controls></video>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="">
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                onChange={OnchangeReelsHandler}
                                                                name="files"
                                                                id="file-upload"
                                                                accept="video/mp4,video/x-m4v,video/*"
                                                            />
                                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                                <span className="dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                                                    <FiPlusCircle className="size-64" />
                                                                </span>
                                                            </label>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <div className="w-full md:w-[50%]">
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Content
                                                    </h3>
                                                    <div className="mt-2">
                                                        <textarea
                                                            value={PostData.caption}
                                                            onChange={handleInputChange}
                                                            name="caption"
                                                            placeholder='caption..'
                                                            className="min-h-[8rem] max-h-[8rem] p-2 size-96 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Location
                                                    </h3>
                                                    <div className="mt-2">
                                                        <input
                                                            value={PostData.location}
                                                            onChange={handleInputChange}
                                                            type='text'
                                                            name="location"
                                                            placeholder='Location'
                                                            className=" p-2 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="my-2">
                                                    <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                        Tags
                                                    </h3>
                                                    <div className="mt-2">
                                                        <input
                                                            value={PostData.location}
                                                            onChange={handleInputChange}
                                                            type='text'
                                                            name="location"
                                                            placeholder='Location'
                                                            className=" p-2 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <Button onClick={handleReelSubmit}>POST</Button>

                                    </div>
                                )
                            }


                        </div>


                    </div>
            }


        </div>
    )
}

export default CreatePost;
