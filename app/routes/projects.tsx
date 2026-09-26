import { ProjectCard } from "../components/projectCard/projectCard";
import { projects } from "../components/projectCard/projects";

export default function Projects() {
  return <>
    <h2>Projects</h2>
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-5">
          {projects.map((project, index) => {
              return (<ProjectCard key={project} {...project}/>)
          })}
      </div>
    </div>
  </>;
}


