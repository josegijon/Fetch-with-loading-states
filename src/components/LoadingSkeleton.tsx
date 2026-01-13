import { SkeletonCard } from "./SkeletonCard";

export const LoadingSkeleton = () => {
    const skeletonCount = Array.from({ length: 20 });

    return (
        <ul className="flex flex-col items-center justify-center gap-4 w-full sm:flex-row sm:flex-wrap sm:px-6">
            {skeletonCount.map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </ul>
    )
}
