// components/Tabs.tsx
import React from 'react';

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center mt-6">
            {['Posts', 'About'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 mx-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : 'text-gray-500'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;