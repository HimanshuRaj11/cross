// components/RightSidebar.tsx
"use client"
import React, { useEffect, useState } from 'react';
import UserCard from './Usercard';
import GameCard from './GameCard';
import ProfileCard from './Profilecard';
import { useSelector } from 'react-redux';
import { IUser } from '@/models/user.model';
import axios from 'axios';



const suggestedGames = [
    {
        _id: "1",
        name: "a1"
    },
];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const RightSidebar = () => {
    const { User: { user } } = useSelector((state: any) => state.User);

    const [SuggestUsers, setSuggestUser] = useState<IUser[]>([]);
    const fetchSuggestUser = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/user/suggestuser`, { withCredentials: true })
            setSuggestUser(data.user)
            return
        } catch (error) {
            return
        }
    }
    // useEffect(() => {
    //     fetchSuggestUser()
    // }, [])
    return (
        <div className="hidden lg:w-[30%] lg:block w-full p-4 min-h-screen transition-all duration-300 ease-in-out">

            {
                user ? (
                    <div>
                        <ProfileCard />
                        <h2 className="text-xl font-bold mb-4">Suggested Users</h2>
                        <div className="space-y-4">
                            {SuggestUsers?.map((suggestedUser: IUser, i: number) => (
                                <UserCard key={i} suggestedUser={suggestedUser} />
                            ))}
                        </div>
                        <h2 className="text-xl font-bold mt-8 mb-4">Suggested Games</h2>
                        <div className="space-y-4">
                            {suggestedGames.map((game) => (
                                <GameCard key={game._id} game={game} />
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