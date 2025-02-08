"use client"
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const reels = [
    {
        url: "/reels/video1.mp4"
    },
    {
        url: "/reels/video2.mp4"
    },
    {
        url: "/reels/video3.mp4"
    },
    {
        url: "/reels/video4.mp4"
    },
]
const page = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [progress, setProgress] = useState<number[]>(new Array(reels.length).fill(0));

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex) {
                    video.play();
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [currentIndex]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollPosition = e.currentTarget.scrollTop;
        const videoHeight = e.currentTarget.clientHeight;
        const newIndex = Math.round(scrollPosition / videoHeight);
        setCurrentIndex(newIndex);
    };

    const handleVideoClick = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    };

    const handleTimeUpdate = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            const progressValue = (video.currentTime / video.duration) * 100;
            setProgress((prevProgress) => {
                const newProgress = [...prevProgress];
                newProgress[index] = progressValue;
                return newProgress;
            });
        }
    };

    return (
        <div
            className="relative pt-4 sm:mt-0 h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            onScroll={handleScroll}
        >
            {reels.map((reel, index) => (
                <motion.div
                    key={index}
                    className="h-screen flex flex-col items-center justify-center snap-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-[25em] relative flex justify-center items-center">

                        <video
                            ref={(el) => {
                                videoRefs.current[index] = el as HTMLVideoElement | null;
                            }}
                            src={reel.url}
                            className="h-screen rounded-xl sm:h-[96%] w-full  m-2 object-contain"
                            loop
                            playsInline
                            onClick={() => handleVideoClick(index)}
                            onTimeUpdate={() => handleTimeUpdate(index)}
                        ></video>
                        <div className="right-2 bottom-[5em] absolute">

                            <button
                                onClick={() => {
                                    const videoElement = videoRefs.current[index];
                                    if (videoElement) {
                                        videoElement.muted = !videoElement.muted;
                                    }
                                }}
                                className="mute-unmute-button bg-slate-300 p-2  rounded-md "
                            >
                                {videoRefs.current[index]?.muted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                        </div>

                        <div className="bg-slate-500 p-3 absolute m-2 w-[24em] bottom-5 left-2">
                            user details
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default page;