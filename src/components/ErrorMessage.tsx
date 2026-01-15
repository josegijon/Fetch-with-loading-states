interface Props {
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: Props) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 w-full p-4">
            <div className="flex flex-col items-center justify-center gap-4 p-8 border border-red-500/20 bg-red-500/10 rounded-2xl max-w-lg mx-auto">
                <span className="material-symbols-outlined text-4xl! text-red-500 animate-pulse">
                    error
                </span>

                <h2 className="text-2xl font-bold tracking-tight text-white text-center">
                    Gotta Catch 'Em All... But not this time!
                </h2>

                <p className="text-slate-400 text-center text-sm">
                    {message}
                </p>
            </div>


            {/* RETRY BUTTON */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex max-w-50 items-center justify-center gap-2 rounded-xl px-8 py-3 bg-slate-800 text-slate-200 text-sm font-bold transition-all ease-in-out duration-300 cursor-pointer
                hover:bg-slate-700 ">
                    <span className="material-symbols-outlined">refresh</span>
                    <span>Retry Connection</span>
                </button>)
            }
        </div>
    )
}
