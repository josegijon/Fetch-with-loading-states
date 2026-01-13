
export const SkeletonCard = () => {
    return (
        <li className="group flex flex-col bg-[#1e293b] gap-3 border border-white/5 rounded-2xl p-5 shadow-xl transition duration-500 ease-in-out sm:min-w-87.5 sm:max-w-95 sm:flex-1
                     hover:shadow-2xl hover:border-white/20"
        >

            <div className="flex justify-between items-start mb-4">
                <div className="h-5 w-12 skeleton-shimmer rounded"></div>

                <div className="flex gap-1">
                    <div className="h-5 w-14 skeleton-shimmer rounded-full"></div>
                </div>
            </div>

            {/* Image */}
            <div className="w-full aspect-square bg-slate-900/40 rounded-xl mb-4 flex items-center justify-center skeleton-shimmer relative overflow-hidden border border-white/5"></div>

            {/* Name */}
            <div className="skeleton-shimmer h-6 w-1/2 rounded"></div>

            {/* Height and weight */}
            <div className="flex gap-4 mt-2">
                <div className="h-3 w-12 skeleton-shimmer rounded opacity-50"></div>
                <div className="h-3 w-12 skeleton-shimmer rounded opacity-50"></div>
            </div>

            {/* Stats */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-8 skeleton-shimmer rounded opacity-50"></div>
                    <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="skeleton-shimmer h-full w-2/5"></div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-2 w-8 skeleton-shimmer rounded opacity-50"></div>
                    <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="skeleton-shimmer h-full w-2/5"></div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-2 w-8 skeleton-shimmer rounded opacity-50"></div>
                    <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="skeleton-shimmer h-full w-2/5"></div>
                    </div>
                </div>
            </div>
        </li >
    )
}
