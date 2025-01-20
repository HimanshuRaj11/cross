"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Fetchuser } from '@/app/Redux/slice/userSlice';

function FetchuserDetails() {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(Fetchuser() as any)
    }, [])
    return (
        <div>


        </div>
    )
}

export default FetchuserDetails
