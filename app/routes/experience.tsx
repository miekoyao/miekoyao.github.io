import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - Experience" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Experience() {
  return <>
    <h2>Experiences</h2>

    {/* 
    button to show all, add note about being proud of the jobs that have made me who i am :)
    
    - school of cities software dev
    - PRESTO product management co-op student
    - uoft blueprint
    * map and data library
    - dayforce software dev
    - elections ontario information management student
    * map and data library
    * kung fu tea
    * DG ivey library


    */}
  </>;
}
