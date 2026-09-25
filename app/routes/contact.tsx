import ContactForm from "~/components/contactForm";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mieko Yao - Contact" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Contact() {
  return <>
    <h2 className="text-3xl font-bold pb-5">Contact</h2>
    <ContactForm/>
  </>;
}
