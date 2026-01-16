interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: Props) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="material-symbols-outlined w-10 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 hover:bg-white/10 transition ease-in-out duration-300 cursor-pointer disabled:cursor-default disabled:bg-transparent"
            >
                chevron_left
            </button>

            <span className="text-slate-400">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="material-symbols-outlined w-10 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 hover:bg-white/10 transition ease-in-out duration-300 cursor-pointer
                disabled:cursor-default disabled:bg-transparent"
            >
                chevron_right
            </button>
        </div>
    );
};