import { HeaderBar } from "./components/headerBar";
import About from "./routes/about";
import Contact from "./routes/contact";
import Experience from "./routes/experience";
import Home from "./routes/home";
import Projects from "./routes/projects";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - Portfolio" },
    { name: "description", content: "Mieko Yao's software dev and design portfolio :)" },
  ];
}

// App.tsx
export default function App() {
  return (
    <>
      <main>
        <section id="home" className="flex flex-col justify-center mt-[86px]"><Home /></section>
        <section id="about" className="flex flex-col justify-center"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="experiences"><Experience /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  );
}