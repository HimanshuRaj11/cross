// components/RightSidebar.tsx
"use client"
import React from 'react';
import UserCard from './Usercard';
import GameCard from './GameCard';
import ProfileCard from './Profilecard';
import { useSelector } from 'react-redux';


const suggestedUsers = [
    {
        id: "1",
        name: "a1"
    },
];

const suggestedGames = [
    {
        id: "1",
        name: "a1"
    },
];

const RightSidebar = () => {
    const { User: { user } } = useSelector((state: any) => state.User);
    return (
        <div className="hidden lg:w-[30%] lg:block w-full p-4 min-h-screen transition-all duration-300 ease-in-out">

            {
                user ? (
                    <div>
                        <ProfileCard />
                        <h2 className="text-xl font-bold mb-4">Suggested Users</h2>
                        <div className="space-y-4">
                            {suggestedUsers.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                        <h2 className="text-xl font-bold mt-8 mb-4">Suggested Games</h2>
                        <div className="space-y-4">
                            {suggestedGames.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>

                    </div>
                )
            }



        </div>
    );
};

export default RightSidebar;