"use client"
import { useGlobalContext } from '@/context/contextProvider';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBell, FaComments, FaSignInAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux';
const avatarUrl = "https://www.svgrepo.com/show/327465/person-circle.svg"


function TopBar() {
    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()
    const { User: { user } } = useSelector((state: any) => state.User);

    const pathname = usePathname()



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
        <div className={` ${pathname == '/reels' ? "hidden" : ""} sm:hidden fixed top-0 w-full py-1 px-4 z-50 left-0 bg-gray-800 flex justify-between items-center flex-row`}>

            <Link href={'/'} className='text-2xl font-bold flex justify-center items-center flex-row '>
                <Image src="/logo2.png" height={100} width={100} alt='CROSS' />
            </Link>

            {
                user ? (
                    <div className="flex flex-row  justify-evenly">
                        <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            <FaBell onClick={handleNotificationClick} className='size-6 text-white' />
                        </div>
                        <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            <Link href={"/chats"} className=''>
                                <FaComments className='size-6 text-white' />
                            </Link>
                        </div>
                        <div className='flex items-center space-x-2 p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            <Link href={`/${user?.username}`} >
                                <img className="size-10 object-cover rounded-full" src={user?.profilePic?.file ? user?.profilePic?.file : avatarUrl} alt="User avatar" />
                            </Link>
                        </div>
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
