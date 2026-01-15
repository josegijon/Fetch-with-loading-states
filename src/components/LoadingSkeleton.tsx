import { SkeletonCard } from "./SkeletonCard";

export const LoadingSkeleton = () => {
    const skeletonCount = Array.from({ length: 20 });

    return (
        <ul className="w-full p-4 flex flex-col items-center justify-center gap-4 max-w-480 xxs:flex-row xxs:flex-wrap">
            {skeletonCount.map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </ul>
    )
}
