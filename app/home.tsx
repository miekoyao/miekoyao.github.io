import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - Portfolio" },
    { name: "description", content: "Mieko Yao's software dev and design portfolio :)" },
  ];
}

export default function Home() {
  return (<>
  <div className="flex flex-col justify-center items-center">
    <h1 className="text-7xl text-center font-extrabold bg-slate-50 dark:bg-slate-950">Hi! I'm Mieko :)</h1>
    <p className="pt-10">I'm a software developer who likes translating ideas and complex technical specs into functional products that solve real problems.</p>
  </div>

    <div className="flex gap-10">
      <a href="https://www.linkedin.com/in/miekoyao">linkedin icon here</a>
      <a href="https://www.github.com/miekoyao">github icon here</a>
      <a href="mailto:miekoyao@gmail.com">email icon here</a>
    </div>
  </>);
}
