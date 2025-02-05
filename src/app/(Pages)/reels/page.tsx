import React from 'react';
// import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
export default function ReelsPage() {
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
    return (
        <div className="h-screen w-full">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center bg-black">
                    <Carousel >
                        <CarouselContent>
                            {
                                reels.map((reel, i) => {
                                    return (
                                        <CarouselItem key={i} className='w-[10rem] flex justify-center items-center bg-white'>
                                            <video className="h-[90%] w-[25%] object-cover rounded-lg" controls>
                                                <source src={`${reel.url}`} type="video/mp4" />
                                            </video>
                                        </CarouselItem>
                                    )
                                })
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>


                </div>
            </div>
        </div>
    );
}

