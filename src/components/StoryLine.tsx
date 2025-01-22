"use client"

import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

interface Story {
    id: number;
    image: string;
    username: string;
}

interface StorySliderProps {
    stories: Story[];
}

const StorySlider: React.FC<StorySliderProps> = ({ stories }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { User: { user } } = useSelector((state: any) => state.User);


    return (
        <div className="flex p-4 items-center justify-center  w-full">
            <div ref={sliderRef} className="flex space-x-2 overflow-x-scroll scrollbar-hide">
                <div className={`transition-transform duration-500 ease-in-out transform $scale-100`}
                >
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
                        <img src={`https://picsum.photos/200/300?random`} alt={''} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center text-xs mt-2">{user?.username}</p>
                </div>
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className={`transition-transform duration-500 ease-in-out transform $scale-100'
                            }`}
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
                            <img src={`https://picsum.photos/200/300?random=${index}`} alt={story.username} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center text-xs mt-2">{story.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StorySlider;