// components/UserCard.js
import { IUser } from '@/models/user.model';
import React from 'react';

const UserCard = ({ suggestedUser }: { suggestedUser: IUser }) => {

    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold">{suggestedUser.name}</h3>
            <p className="text-gray-600">{suggestedUser.bio}</p>
        </div>
    );
};

export default UserCard;