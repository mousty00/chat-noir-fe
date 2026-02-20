import { Skeleton } from "@/components/ui/skeleton";

export const CatCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-sm rounded-xl p-2">
            {/* Image Skeleton */}
            <Skeleton className="w-full aspect-square rounded-lg" />

            <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center justify-between">
                    {/* Name Skeleton */}
                    <Skeleton className="h-5 w-2/3" />
                </div>

                {/* Divider Skeleton */}
                <div className="h-px w-full bg-white/5" />

                <div className="flex justify-between items-center mt-1">
                    {/* Date Skeleton */}
                    <Skeleton className="h-3 w-1/4" />
                    {/* Link Skeleton */}
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export const CatGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 12 }).map((_, i) => (
                <CatCardSkeleton key={i} />
            ))}
        </div>
    );
};
