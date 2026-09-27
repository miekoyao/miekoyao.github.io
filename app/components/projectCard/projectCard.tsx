import { StarIcon } from "~/icons/star";
import type { CardProps } from "./projects";

export function ProjectCard({ title, tags, thumbnail, description, demo, repo }: CardProps) {
    return (
    <div className="w-90 p-6 rounded-xl bg-slate-300 dark:bg-slate-800 flex flex-col justify-between">
        <div>
            <div className="bg-slate-200 dark:bg-slate-700 rounded-lg" style={{width: "fit-content", height: "fit-content"}}>
                { thumbnail ? <img className="object-cover object-top w-full aspect-3/2 rounded-lg border-5 border-offset-1 border-slate-200 dark:border-slate-700 mb-3" 
                    src={`/assets/projects/${thumbnail}`}/> : ""}
            </div>
            <h3 className="font-extrabold text-xl pt-2">{title}</h3>
            <p className="pt-2">{description}</p>
            { (demo || repo) && 
                <div className="flex gap-5 pt-2">
                    { demo && <a href={demo} target="_blank" className="underline italic hover:opacity-75">demo link</a>}
                    { (demo && repo) && <p>|</p>}
                    { repo && <a href={repo} target="_blank" className="underline italic hover:opacity-75">repo link</a>}
                </div>
            }
        </div>
        <div className="tags flex flex-wrap pt-5">
            {tags.map((tag, index) => {
                return (
                    <div key={tag} className="flex items-center pt-1">
                        <p className="px-3 rounded-full bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800">
                            {tag}
                        </p>
                        {index < tags.length - 1 && <div className="w-2 h-2 mx-2"><StarIcon color="currentColor"/></div>}
                    </div>
                );
            })}
        </div>
    </div>
    )
}