"use client"
import React from 'react'
import Popovercard from './Popover'
import { useGlobalContext } from '@/context/contextProvider'

function ShowPopover() {
    const { Popover } = useGlobalContext()
    return (
        <div>
            {
                Popover ? <Popovercard /> : ""
            }
        </div>
    )
}

export default ShowPopover
