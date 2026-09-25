import type { Route } from "../+types/home";
import { ProjectCard } from "../components/projectCard/projectCard";
import { projects } from "../components/projectCard/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - Projects" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Projects() {
  return <>
    <p>projects</p>
    <div className="flex gap-5 flex-wrap">
        {projects.map((project, index) => {
            return (<ProjectCard key={project} {...project}/>)
        })}
    </div>
    {/* 
    - add tags and filter option to do design, development, frontend, backend, data, product
    - PROJECTS LIST
        - Transporting around Toronto -> Design, Development, Frontend, Data
        - Designing Deliberation -> Design, Development, Frontend -> under development, please reach out to me for access!
        - LoSo -> Design, Development, Frontend -> under development, please reach out to me for access!
        - School of Cities map -> design, development
        - CRM & Job Board -> 
        - GO Service Guarantee emails -> Development, frontend
        - History of Insulin -> embedded systems, design
        - breakout game -> assembly lol
        - oxtail recipe app
        - Recipe app design
        - toronto fitness club 
    */}
  </>;
}


