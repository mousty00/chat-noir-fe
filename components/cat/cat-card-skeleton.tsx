import { Skeleton } from "@/components/ui/skeleton";

export const CatCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-sm rounded-xl p-2">

            <Skeleton className="w-full aspect-square rounded-lg" />

            <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center justify-between">

                    <Skeleton className="h-5 w-2/3" />
                </div>


                <div className="h-px w-full bg-muted" />

                <div className="flex justify-between items-center mt-1">

                    <Skeleton className="h-3 w-1/4" />

                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export const CatGridSkeleton = () => {
    return (
        <div className="grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {Array.from({ length: 12 }).map((_, i) => (
                <CatCardSkeleton key={i} />
            ))}
        </div>
    );
};
