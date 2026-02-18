export const LoadingState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mb-4" />
            <p className="text-gray-600">Loading cats...</p>
        </div>
    );
};