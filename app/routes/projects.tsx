import { ProjectCard } from "../components/projectCard/projectCard";
import { projects } from "../components/projectCard/projects";

export default function Projects() {
  return <>
    <h2>Projects</h2>
    <div className="flex justify-center">
      <div className="grid grid grid-cols-1 grid2:grid-cols-2 grid3:grid-cols-3 gap-5">
          {projects.map((project) => {
              return (<ProjectCard key={project.title} {...project}/>)
          })}
      </div>
    </div>
  </>;
}


