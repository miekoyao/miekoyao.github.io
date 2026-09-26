import { StarIcon } from "~/icons/star";

export function StarCount({num}: {num: number}) {
    return (
        <div className="relative w-22 h-22">
            <div className="absolute w-22 h-22">
                <StarIcon/>
            </div>
            <div className="absolute w-22 h-22 flex items-center justify-center">
                <p className="mt-2 text-slate-50 dark:text-slate-800 text-3xl font-bold">{num}</p>
            </div>
        </div> 
    )
}