import { Skeleton } from "@/components/ui/skeleton";

export const CatCardSkeleton = () => {
    return (
        <div className="flex flex-col w-full">

            <Skeleton className="w-full aspect-square rounded-2xl" />

            <div className="pt-2.5 pb-1 px-0.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/4" />
                </div>

                <div className="flex md:hidden items-center gap-1.5 mt-2.5">
                    <Skeleton className="h-7 w-7 rounded-xl" />
                    <Skeleton className="h-7 w-7 rounded-xl" />
                    <Skeleton className="h-7 w-7 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export const CatGridSkeleton = () => {
    return (
        <section className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
                <CatCardSkeleton key={i} />
            ))}
        </section>
    );
};
