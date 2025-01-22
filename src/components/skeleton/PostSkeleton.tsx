import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
function PostSkeleton() {
    return (
        <div className="mx-auto w-full p-2 md:w-[80%] lg:w-[70%] shadow-lg rounded-lg my-4 ">
            <div className="flex items-center space-x-4 mb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="flex flex-col space-y-3 w-full ">
                <Skeleton className="h-[38vh] w-[100%] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}

export default PostSkeleton
