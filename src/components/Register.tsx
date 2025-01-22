"use client"
import { Fetchuser } from '@/app/Redux/slice/userSlice';
import { useGlobalContext } from '@/context/contextProvider';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const { setSearch, setPopover, setNotificationPop, setCreatePostBtn, setLoginBtn, setRegisterBtn } = useGlobalContext()

    const handleLoginClick = () => {
        setPopover(true)
        setLoginBtn(true)
        setSearch(false)
        setNotificationPop(false)
        setCreatePostBtn(false)
        setRegisterBtn(false)
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleconfirmPasswordVisibility = () => {
        setShowConfirmPassword(!ShowConfirmPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleregister = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/auth/register`, { registerData: formData }, { withCredentials: true })
            dispatch(Fetchuser() as any)
            setRegisterBtn(false)
            setPopover(false)
            toast.success(data.message)
            return
        } catch (error) {
            return error
        }
    }

    return (
        <div className="w-[95%] mx-auto p-4 ">
            <div className="flex justify-center flex-col items-center text-2xl font-bold mb-4">
                <h1>Logo</h1>
                <h2 className='text-gray-800'>Register</h2>
            </div>
            <div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastname"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
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
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder={showPassword ? 'password' : '********'}
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
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type={ShowConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder={ShowConfirmPassword ? 'confirm password' : '********'}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                            onClick={toggleconfirmPasswordVisibility}
                        >
                            {!ShowConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button onClick={handleregister} className="w-full p-2 bg-blue-500 text-white rounded">
                    Register
                </button>
            </div>
            <div className="flex">
                <span className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleLoginClick}>
                    already have an account! Login
                </span>
            </div>
        </div>
    );
};

export default Register;