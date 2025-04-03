import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="max-w-4xl mx-auto mt-20 bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Cover Photo Skeleton */}
            <div className="h-32 bg-gray-200 animate-pulse"></div>

            {/* Profile Content */}
            <div className="p-6 text-center">
                <div className="relative flex justify-center -mt-12">
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-white" />
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                </div>

                <div className="mt-6 flex justify-center gap-6">
                    <div className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                        <span className="block text-gray-400 text-sm">Followers</span>
                    </div>
                    <div className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                        <span className="block text-gray-400 text-sm">Following</span>
                    </div>
                    <div className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                        <span className="block text-gray-400 text-sm">Posts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
