export interface CardProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  tags: Array<string>;
  thumbnail: string;
  description: string;
  link?: string;
}

export const projects: Array<CardProps> = [
    {
        title: "Local Solutions",
        tags: ["Svelte", "Figma", "Inkscape"],
        thumbnail: "",
        description: "Website showcasing winners of the School of Cities Local Solutions contest, for organizations solving place-based challenges.",
        link: "https://schoolofcities.github.io/local-solutions"
    },
    {
        title: "Designing Deliberation: Framework Builder Tool",
        tags: ["Svelte", "Figma"],
        thumbnail: "",
        description: "",
        link: "https://schoolofcities.github.io/designing-deliberation/interactive-tool/framework",
    },
    {
        title: "Transit Oriented Development",
        tags: ["Svelte"],
        thumbnail: "",
        description: "Scrollytelling webpages featuring case studies and research articles about Transit Oriented Design in Canada.",
        link: "https://schoolofcities.github.io/tod-canada/case-study/arbutus",
    },
    {
        title: "Transporting around Toronto: Interactive Data Story",
        tags: ["D3.js", "Tableau"],
        thumbnail: "",
        description: "",
    },
]