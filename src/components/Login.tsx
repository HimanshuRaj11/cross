"use client"
import { Fetchuser } from '@/app/Redux/slice/userSlice';
import { useGlobalContext } from '@/context/contextProvider';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Login() {
    const dispatch = useDispatch();
    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()

    const [showPassword, setShowPassword] = useState(false);
    const handleRegisterClick = () => {
        setPopover(true)
        setRegisterBtn(true)
        setLoginBtn(false)
        setSearch(false)
        setNotificationPop(false)
        setCreatePostBtn(false)
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [LoginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setLoginData((preVal) => {
            return { ...preVal, [name]: value };
        });


    }

    const handleSubmit = async () => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`, { LoginData }, { withCredentials: true })
            dispatch(Fetchuser() as any)
            setPopover(false)
            setLoginBtn(false)
            toast.success(data.message)

        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        <div className="flex w-[95%] flex-col items-center justify-center" >
            <div className="w-full">
                <form className=" px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name='username'
                            placeholder="Username"
                            value={LoginData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="******************"
                                value={LoginData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                                onClick={togglePasswordVisibility}
                            >
                                {!showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">

                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="flex mt-2 items-center">
                        <button onClick={handleSubmit} className="bg-blue-500 w-full flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button">
                            <FaSignInAlt className="mr-2" />
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleRegisterClick}>
                            Create Account
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;