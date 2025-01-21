import { IUser } from "@/models/user.model";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaPaperPlane, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const CommentsBox = ({ post, Comments }: { post: any, Comments: any }) => {
    const { user } = useSelector((state: { user: IUser }) => state);
    const [InputComment, setInputComment] = useState("")
    const [ReplyInputActive, setReplyInputActive] = useState(false)

    const InputCommentChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputComment(e.target.value)
    }
    const commentHandler = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/post/comment`, { Post_id: post._id, Comments: InputComment }, { withCredentials: true })
            toast.success(data.message)
            setInputComment("")
            return
        } catch (error: any) {
            toast.error(error.message)
            return error
        }
    }

    return (

        <div className="max-h-96 bg-gray-100 px-4 pb-3 w-full shadow-md ">
            <div className="mb-2 ">
                <h2 className="text-lg font-semibold leading-none">Comments</h2>

                {
                    Comments && Comments.length > 0 && (

                        <div className="bg-white max-h-52 w-full  overflow-y-scroll p-2 rounded-lg shadow-sm mb-2">
                            {
                                Comments.map((comment: any) => {
                                    const createdAt: number | string = comment?.createdAt ?? 0;
                                    const createdAtDate = new Date(createdAt);
                                    const currentDate = new Date();

                                    const differenceInMilliseconds = currentDate.getTime() - createdAtDate.getTime();

                                    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
                                    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
                                    const differenceInHours = Math.floor(differenceInMinutes / 60);
                                    const differenceInDays = Math.floor(differenceInHours / 24);
                                    let PostTime = ""
                                    if (differenceInDays > 0) {
                                        PostTime = `${differenceInDays} days ago`;
                                    } else if (differenceInHours > 0) {
                                        PostTime = `${differenceInHours} hours ago`;
                                    } else if (differenceInMinutes > 0) {
                                        PostTime = `${differenceInMinutes} minutes ago`;
                                    } else {
                                        PostTime = `${differenceInSeconds} seconds ago`;
                                    }
                                    const liked = comment.likes.includes(user?._id);
                                    const likeOrDislikeHandler = async (comment_id: any) => {
                                        try {
                                            if (!user) {
                                                return
                                            }
                                            const action = liked ? 'dislike' : 'like';

                                            await axios.post(`${baseUrl}/api/v1/post/comment/${action}`, { comment_id }, { withCredentials: true })

                                            return
                                        } catch (error) {
                                            return error
                                        }
                                    }
                                    const [replyBox, setReplyBox] = useState(false)
                                    const [viewRepliesBox, setviewRepliesBox] = useState(false)
                                    const [replies, setReplies] = useState()

                                    const viewReplies = async (replies: any) => {
                                        try {

                                            const { data: RepliesList } = await axios.post(`${baseUrl}/api/v1/post/comment/reply/fetch`, { replies }, { withCredentials: true })
                                            setviewRepliesBox(!viewRepliesBox)
                                            setReplies(RepliesList.RepliesList);
                                            return
                                        } catch (error: any) {
                                            toast.error(error.message)
                                            return error
                                        }
                                    }
                                    const [InputReply, setInputReply] = useState("")
                                    const replyInputHandle = async () => {
                                        try {
                                            setReplyInputActive(true)
                                            const { _id: comment_id, user: { _id: tagUser } } = comment
                                            const { data } = await axios.post(`${baseUrl}/api/v1/post/comment/reply`, { reply: InputReply, comment_id, tagUser })
                                            console.log(data);

                                            return
                                        } catch (error) {
                                            return error
                                        }
                                    }
                                    return (
                                        <div key={comment?._id} className='w-full rounded-lg shadow-md bg-gray-100 mb-2 flex flex-row relative'>
                                            <div className="">
                                                <Link href={""}>
                                                    <img className="w-10 h-10 object-cover rounded-full" src={comment?.user?.profilePic?.file ? comment?.user?.profilePic?.file : avatarUrl} alt="User avatar" />
                                                </Link>
                                            </div>
                                            <div className="ml-2 w-[95%] p-2 ">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{comment?.user?.username}</span>
                                                </div>
                                                <div className="w-full flex flex-row">
                                                    <p className="text-gray-700 mt-1 ">{comment?.Comment}</p>
                                                    <button onClick={() => likeOrDislikeHandler(comment._id)} className={`${liked ? "text-blue-500" : "text-gray-500"} hover:text-blue-500 text-sm flex items-center absolute top-2 right-2 `}>
                                                        <FaThumbsUp className="mr-1" />
                                                    </button>
                                                </div>
                                                <div className='flex flex-row'>
                                                    <p className='text-gray-500 text-[14px] p-1 mx-1 font-semibold'>{PostTime}</p>
                                                    <span className='text-gray-500 text-[14px] p-1 mx-1 font-semibold'>{comment?.likes.length} likes</span>
                                                    <button className="text-blue-500 text-[14px] p-1 mx-1 font-semibold"> {comment?.replies?.length} Reply</button>
                                                </div>
                                                {/* Reply */}
                                                <h1 className='text-gray-500 text-[14px]' onClick={() => viewReplies(comment?.replies)}> {viewRepliesBox ? "Hide replies" : "view Replies"} </h1>

                                                {viewRepliesBox ? (

                                                    <>
                                                        <hr className="border-t border-gray-300 my-1" />
                                                        {

                                                            <Replies replies={replies} />
                                                        }

                                                    </>
                                                ) : ""}



                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }


            </div>

            <div className="mt-4 overflow-hidden flex flex-row justify-between w-full border rounded-lg bg-white items-center">
                <input onChange={InputCommentChangehandler} value={InputComment} type="text" className="w-[92%] p-2 outline-none focus:border-white " placeholder="Write your comment..." />
                {ReplyInputActive ?
                    <button onClick={commentHandler} id='commentBox' className="w-fit mr-4 flex items-center cursor-pointer fo">
                        <FaPaperPlane className=" size-6 text-blue-500 hover:text-blue-700" />
                    </button>
                    :
                    <button onClick={commentHandler} id='commentBox' className="w-fit mr-4 flex items-center cursor-pointer fo">
                        <FaPaperPlane className=" size-6 text-blue-500 hover:text-blue-700" />
                    </button>
                }
            </div>



        </div>
    )
}

const Replies = ({ replies }: { replies: any }) => {
    const { User: { user } } = useSelector((state: any) => state.User);


    return (
        <div className="">
            {
                replies.map((reply: any) => {
                    const createdAt: number | string = reply?.createdAt ?? 0;
                    const createdAtDate = new Date(createdAt);
                    const currentDate = new Date();

                    const differenceInMilliseconds = currentDate.getTime() - createdAtDate.getTime();

                    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
                    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
                    const differenceInHours = Math.floor(differenceInMinutes / 60);
                    const differenceInDays = Math.floor(differenceInHours / 24);
                    let PostTime = ""
                    if (differenceInDays > 0) {
                        PostTime = `${differenceInDays} days ago`;
                    } else if (differenceInHours > 0) {
                        PostTime = `${differenceInHours} hours ago`;
                    } else if (differenceInMinutes > 0) {
                        PostTime = `${differenceInMinutes} minutes ago`;
                    } else {
                        PostTime = `${differenceInSeconds} seconds ago`;
                    }
                    const liked = reply?.likes?.includes(user?._id);
                    console.log(liked, user?._id, reply?.likes);

                    const ReplylikeOrDislikeHandler = async (reply_id: any) => {
                        try {
                            if (!user) {
                                return
                            }
                            const action = liked ? 'dislike' : 'like';
                            await axios.post(`${baseUrl}/api/v1/post/comment/reply/${action}`, { reply_id }, { withCredentials: true })
                            return
                        } catch (error) {
                            return
                        }
                    }
                    return (
                        <div key={reply._id} className=' mb-2 flex flex-row relative w-full'>
                            <Link href={""}>
                                <img className="w-10 h-10 object-cover rounded-full" src={reply?.user?.profilePic?.file ? reply?.user?.profilePic?.file : avatarUrl} alt="User avatar" />
                            </Link>
                            <div className="ml-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{reply?.user?.username}</span>
                                </div>
                                <div className="w-full flex flex-row">
                                    <p className="text-gray-700 mt-1 "><span className="font-semibold">@ {reply.tagUser.username}</span> {reply?.reply}</p>
                                    <button onClick={() => ReplylikeOrDislikeHandler(reply._id)} className={`${liked ? "text-blue-500" : "text-gray-500"} hover:text-blue-500 text-sm flex items-center absolute top-2 right-2 `}>
                                        <FaThumbsUp className="mr-1" />
                                    </button>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='text-gray-500 text-[14px] p-1 mx-1 font-semibold'>{PostTime}</p>
                                    <span className='text-gray-500 text-[14px] p-1 mx-1 font-semibold'>{reply?.likes.length} likes</span>
                                    {/* <button onClick={() => replyHandle()} className="text-blue-500 text-[14px] p-1 mx-1 font-semibold"> {comment?.replies?.length} Reply</button> */}
                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}