"use client"

import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex p-4 items-center justify-center space-x-4 w-[80%]">
            <button onClick={handlePrev} className="text-gray-600 hover:text-blue-500">
                <FaChevronLeft className="w-6 h-6" />
            </button>
            <div ref={sliderRef} className="flex space-x-4 overflow-x-scroll scrollbar-hide">
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
            <button onClick={handleNext} className="text-gray-600 hover:text-blue-500">
                <FaChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default StorySlider;