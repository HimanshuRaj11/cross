"use client"
import { useGlobalContext } from '@/context/contextProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaCompass, FaHome, FaPlusCircle, FaSearch } from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useSelector } from 'react-redux';

function MobileBarMenu() {
    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()
    const { User: { user } } = useSelector((state: any) => state.User);
    const pathname = usePathname()
    const handleSearchClick = () => {
        setPopover(true)
        setSearch(true)
        setNotificationPop(false)
        setCreatePostBtn(false)
        setLoginBtn(false)
        setRegisterBtn(false)
    };
    const handleLoginClick = () => {
        setPopover(true)
        setLoginBtn(true)
        setSearch(false)
        setNotificationPop(false)
        setCreatePostBtn(false)
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
    const menuItems = [
        { icon: <FaHome className='size-6' />, label: 'Home', link: "/" },
        { icon: <FaSearch className='size-6' />, label: 'Search', onClick: handleSearchClick },
        { icon: <MdOutlineVideoLibrary className='size-6' />, label: 'Reel', link: 'reels' },
        { icon: <FaCompass className='size-6' />, label: 'Explore', link: "/explore" },
        { icon: <FaPlusCircle className='size-6' />, label: 'Create', onClick: handleCreatePost },
    ]
    return (
        <div className={`${pathname == '/reels' ? "hidden" : ""} sm:hidden fixed bottom-0 w-full py-3 z-40 left-0 bg-gray-800 flex justify-around items-center flex-row`}>

            {menuItems.map((item, index) => (

                item.link ? (
                    <Link key={index} href={item.link ? item.link : ""}  >
                        <div className='flex items-center space-x-2 p-2  text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out'>
                            {item.icon}
                            <span className='hidden md:inline'>{item.label}</span>
                        </div>
                    </Link>
                ) : (
                    <div key={index} className='flex items-center text-white space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-300 ease-in-out' onClick={item.onClick}>
                        {item.icon}
                        <span className='hidden md:inline'>{item.label}</span>
                    </div>
                )


            ))}


        </div>
    )
}

export default MobileBarMenu
