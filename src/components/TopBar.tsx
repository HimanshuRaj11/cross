"use client"
import { useGlobalContext } from '@/context/contextProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaBell, FaComments, FaCompass, FaHome, FaPlusCircle, FaSearch, FaSignInAlt, FaUser } from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useSelector } from 'react-redux';

function TopBar() {
    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()
    const { User: { user } } = useSelector((state: any) => state.User);


    const handleLoginClick = () => {
        setPopover(true)
        setLoginBtn(true)
        setSearch(false)
        setNotificationPop(false)
        setCreatePostBtn(false)
        setRegisterBtn(false)
    };
    const handleNotificationClick = () => {
        setPopover(true)
        setNotificationPop(true)
        setSearch(false)
        setCreatePostBtn(false)
        setLoginBtn(false)
        setRegisterBtn(false)
    };

    return (
        <div className='sm:hidden fixed top-0 w-full py-1 px-4 z-50 left-0 bg-gray-800 flex justify-between items-center flex-row'>

            <Link href={'/'} className='text-2xl font-bold flex justify-center items-center flex-row '>
                <Image src="/logo2.png" height={100} width={100} alt='CROSS' />
            </Link>

            {
                user ? (
                    <div className="flex flex-row w-[30%] justify-evenly">
                        <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            <FaBell onClick={handleNotificationClick} className='size-6 text-white' />
                        </div>
                        <Link href={"/chats"} >
                            <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                                <FaComments className='size-6 text-white' />
                            </div>
                        </Link>
                        <Link href={`/${user?.username}`} >
                            <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                                <FaUser className='size-6 text-white' />
                            </div>
                        </Link>
                    </div>
                )
                    : (

                        <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            <FaSignInAlt onClick={handleLoginClick} className='size-6 text-white' />
                        </div>
                    )
            }



        </div>
    )
}

export default TopBar
