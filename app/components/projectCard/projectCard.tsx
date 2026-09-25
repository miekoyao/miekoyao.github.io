import "./projectCard.css";
import type { CardProps } from "./projects";



export function ProjectCard({ title, tags, thumbnail, description }: CardProps) {
    return (
    <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tags flex gap-10">
            {tags.map((tag) => {
                return (
                <div key={tag} className="tag">
                    {tag}
                </div>
                );
            })}
        </div>
    </div>
    )
}