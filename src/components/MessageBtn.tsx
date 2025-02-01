'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export default function MessageBtn({ OtherUser }: { OtherUser: any }) {
    const router = useRouter();
    const onMessage = async () => {
        try {

            const { data } = await axios.post(`${baseUrl}/api/v1/chat/createChat`, { OtherUser })
            console.log(data);
            if (data.success) {
                router.push('/chats')
            }
            return
        } catch (error) {
            return error
        }
    }
    return (
        <button
            onClick={onMessage}
            className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300"
        >
            Message
        </button>
    )
}