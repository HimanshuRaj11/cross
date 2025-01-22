"use client"
import Link from 'next/link';
import React from 'react';
import { FaHome, FaSearch, FaCompass, FaCog, FaComments, FaBell, FaUser, FaSignInAlt, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
import { useGlobalContext } from '@/context/contextProvider';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Fetchuser } from '@/app/Redux/slice/userSlice';
import Image from 'next/image';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL



export default function LeftSidebar() {
    const dispatch = useDispatch();
    const { User: { user } } = useSelector((state: any) => state.User);


    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()

    const handleSearchClick = () => {
        setPopover(true)
        setSearch(true)
        setNotificationPop(false)
        setCreatePostBtn(false)
        setLoginBtn(false)
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
    const handleCreatePost = () => {
        if (!user) {
            handleLoginClick()
        } else {

            setPopover(true)
            setCreatePostBtn(true)
            setSearch(false)
            setNotificationPop(false)
            setLoginBtn(false)
            setRegisterBtn(false)
        }
    };
    const handleLoginClick = () => {
        setPopover(true)
        setLoginBtn(true)
        setSearch(false)
        setNotificationPop(false)
        setCreatePostBtn(false)
        setRegisterBtn(false)
    };
    const handleLogout = async () => {
        try {
            await axios.get(`${baseUrl}/api/v1/auth/logout`)
            dispatch(Fetchuser() as any)
            handleLoginClick()
            return
        } catch (error) {
            return error
        }
    };

    const menuItems = [
        { icon: <FaHome />, label: 'Home', link: "/" },
        { icon: <FaSearch />, label: 'Search', onClick: handleSearchClick },
        { icon: <FaCompass />, label: 'Explore', link: "/explore" },
        { icon: <FaCog />, label: 'Settings', link: "/settings" },
        { icon: <FaComments />, label: 'Chats', link: "/chats" },
        { icon: <FaBell />, label: 'Notification', onClick: handleNotificationClick },
        { icon: <FaPlusCircle />, label: 'Create', onClick: handleCreatePost },
        ...(user ? [
            { icon: <FaUser />, label: 'Account', link: `/account` },
            { icon: <FaSignOutAlt />, label: 'Logout', onClick: handleLogout }
        ] : [
            { icon: <FaSignInAlt />, label: 'Login', onClick: handleLoginClick }
        ])
    ];

    return (
        <div className='hidden sm:flex flex-col fixed top-0 left-0 h-full w-[8%] md:w-[19%] lg:w-[16%] bg-gray-800 text-white transition-all duration-300 ease-in-out'>
            <div className='flex flex-col items-center sm:items-start p-4'>
                <div className='flex items-center justify-center w-full mb-4'>
                    <Link href={'/'} className='text-2xl font-bold hidden md:flex justify-center items-center flex-row '>
                        <Image src="/logo2.png" height={100} width={100} alt='CROSS' />
                    </Link>
                    <span className='text-2xl font-bold md:hidden'>L</span>
                </div>
                <div className='flex flex-col space-y-4'>
                    {menuItems.map((item, index) => (

                        item.link ? (
                            <Link key={index} href={item.link ? item.link : ""}  >
                                <div className='flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                                    {item.icon}
                                    <span className='hidden md:inline'>{item.label}</span>
                                </div>
                            </Link>
                        ) : (
                            <div key={index} className='flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out' onClick={item.onClick}>
                                {item.icon}
                                <span className='hidden md:inline'>{item.label}</span>
                            </div>
                        )


                    ))}
                </div>
            </div>


        </div>
    );
}