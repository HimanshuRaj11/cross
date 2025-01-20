import React from 'react';

interface NotificationProps {
    profileImage: string;
    name: string;
    content: string;
    timeLapse: string;
}

const NotificationCard: React.FC<NotificationProps> = ({ profileImage, name, content, timeLapse }) => {
    return (
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4 w-[60vw] md:w-[40vw] lg:w-[30vw]">
            <img src={profileImage} alt="Profile" className="size-10 md:size-12 rounded-full mr-4" />
            <div>
                <h2 className="font-bold text-sm md:text-lg">{name}</h2>
                <p className="text-gray-600 text-xs md:text-sm">{content}</p>
                <span className="text-gray-400 text-xs md:text-sm">{timeLapse}</span>
            </div>
        </div>
    );
};

const Notification: React.FC = () => {
    const notifications = [
        {
            profileImage: `https://picsum.photos/200/300?random=1`,
            name: 'John Doe',
            content: 'You have a new message!',
            timeLapse: '2 hours ago',
        },
        {
            profileImage: `https://picsum.photos/200/300?random=2`,
            name: 'John Doe',
            content: 'You have a new message!',
            timeLapse: '2 hours ago',
        },
        // Add more notifications as needed
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {notifications.map((notification, index) => (
                <NotificationCard key={index} {...notification} />
            ))}
        </div>
    );
};

export default Notification;