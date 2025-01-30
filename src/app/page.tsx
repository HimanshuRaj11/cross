"use client"
import RightSidebar from "@/components/RightSidebar";
import StorySlider from "@/components/StoryLine";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./Redux/slice/PostSlice";
import Footer from "@/components/footer";
import Posts from "@/components/Posts";
import { useGlobalContext } from "@/context/contextProvider";
import { io } from "socket.io-client";


const stories = [
  { id: 1, image: '/images/story1.jpg', username: 'user1' },
  { id: 2, image: '/images/story2.jpg', username: 'user2' },
  { id: 3, image: '/images/story3.jpg', username: 'user3' },
  { id: 4, image: '/images/story3.jpg', username: 'user3' },
  { id: 5, image: '/images/story3.jpg', username: 'user3' },
  { id: 6, image: '/images/story3.jpg', username: 'user3' },
  { id: 7, image: '/images/story3.jpg', username: 'user3' },
  { id: 8, image: '/images/story3.jpg', username: 'user3' },
  { id: 9, image: '/images/story3.jpg', username: 'user3' },
  { id: 10, image: '/images/story3.jpg', username: 'user3' },
  { id: 11, image: '/images/story3.jpg', username: 'user3' },
  { id: 12, image: '/images/story3.jpg', username: 'user3' },
  { id: 13, image: '/images/story3.jpg', username: 'user3' },
  // Add more stories as needed
];



export default function Home() {
  const dispatch = useDispatch();
  const { User: { user } } = useSelector((state: any) => state.User);
  const { socket, setSocket } = useGlobalContext()

  useEffect(() => {
    dispatch(fetchPost() as any)

  }, [])
  useEffect(() => {
    if (user) {
      console.log(process.env.NEXT_PUBLIC_SOCKET_URI);

      const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URI}`)
      setSocket(socket)
      socket.emit("User", user?._id)

    }
  }, [user])
  return (
    <div>
      <div className=" flex flex-row justify-between w-full mt-14 sm:mt-0">
        <div className="w-full lg:w-[70%]  flex flex-col">
          <div className="w-full flex items-center justify-center">
            {
              user && <StorySlider stories={stories} />
            }
          </div>
          <Posts />

        </div>

        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
}
