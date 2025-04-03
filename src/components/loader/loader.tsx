"use client"
import React from 'react'
import './loader.css'
import { useGlobalContext } from '@/context/contextProvider'

export default function Preloader() {
    const { Loading } = useGlobalContext()
    return (
        <>
            {Loading &&
                <div className="fixed w-full z-50 top-0 h-screen flex justify-center items-center  bg-slate-200 bg-opacity-75 ">

                    <div className="loader">
                        <div className="box">
                            <div className="logo">
                                <img className=' object-cover w-full ' src="./cross-logo.png" alt="" />
                            </div>
                        </div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>
            }
        </>


    )
}
