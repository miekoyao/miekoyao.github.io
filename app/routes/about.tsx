import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - About" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <>
    <div className="flex">
      <img/>
      <div>
        <h2>About </h2>
        <p>I'm a recent graduate from the University of Toronto where I double majored in Computer Science and Quantitative Biology. I have a diverse range of experience spanning web development, software engineering, UI/UX design, product management, and business analysis. I love applying my expertise and learning new skills to help solve real-world problems.</p>
      </div>
    </div>
  </>;
}
