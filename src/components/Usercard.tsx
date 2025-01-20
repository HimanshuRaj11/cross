// components/UserCard.js
import React from 'react';

const UserCard = ({ user }: { user: any }) => {

    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.bio}</p>
        </div>
    );
};

export default UserCard;