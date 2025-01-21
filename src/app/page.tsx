"use client"
import RightSidebar from "@/components/RightSidebar";
import StorySlider from "@/components/StoryLine";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "./Redux/slice/PostSlice";
import Footer from "@/components/footer";
import Posts from "@/components/Posts";


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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


export default function Home() {
  const dispatch = useDispatch();
  console.log(`${baseUrl}/api/v1/post/getAllPost`);
  console.log(baseUrl);
  useEffect(() => {
    dispatch(fetchPost() as any)
  }, [])
  return (
    <div>
      <div className=" flex flex-row justify-between w-full ">
        <div className="w-full lg:w-[70%]  flex flex-col">
          <div className="w-full flex items-center justify-center">
            <StorySlider stories={stories} />
          </div>
          <Posts />

        </div>

        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
}
