"use client"

import React, { useEffect, useRef, useState } from 'react';


export default function ReelVideo({ reel }: { reel: any }) {
    const [isVideoPlaying, setisVideoPlaying] = useState(false);
    const vidRef = useRef<HTMLVideoElement | null>(null);

    const onVideoClick = () => {
        if (vidRef.current) {
            if (isVideoPlaying) {
                vidRef.current.pause();
                setisVideoPlaying(false);
            } else {
                vidRef.current.play();
                setisVideoPlaying(true);
            }
        }
    };

    useEffect(() => {
        const scroll = document.getElementById("video-container");

        if (scroll) {
            scroll.addEventListener("scroll", () => {
                if (vidRef.current) {
                    vidRef.current.pause();
                }
            });
        }
    }, []);

    return (
        <div className="h-[95vh] flex justify-center items-center relative">
            <video
                onClick={onVideoClick}
                className="video-player h-[96%] rounded-lg snap-start"
                ref={vidRef}
                src={reel.url}
                loop
            />
        </div>
    )
}
