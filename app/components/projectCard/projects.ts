export interface CardProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  tags: Array<string>;
  categories: Array<string>;
  thumbnail: string;
  description: string;
  link?: string;
}

export const projects: Array<CardProps> = [
    {
        title: "Local Solutions",
        tags: ["Svelte", "Figma", "Inkscape"],
        categories: ["Web Dev", "Design",],
        thumbnail: "loso.png",
        description: "A website showcasing winners of the School of Cities Local Solutions contest, for organizations solving place-based challenges.",
        link: "https://schoolofcities.github.io/local-solutions"
    },
    {
        title: "Designing Deliberation: Framework Builder Tool",
        tags: ["Svelte", "Figma"],
        categories: ["Web Dev", "Design",],
        thumbnail: "deliberation.png",
        description: "An interactive toolkit for urban practitioners to design high-level public engagement plans.",
        link: "https://schoolofcities.github.io/designing-deliberation/interactive-tool/framework",
    },
    {
        title: "Transit Oriented Development Scrollytelling",
        tags: ["Svelte"],
        categories: ["Web Dev", "Design",],
        thumbnail: "tod.png",
        description: "Animated scroll-style webpages featuring case studies and research articles about Transit Oriented Design in Canada.",
        link: "https://schoolofcities.github.io/tod-canada/case-study/arbutus",
    },
    {
        title: "Transporting around Toronto",
        tags: ["D3.js", "Tableau"],
        categories: ["Web Dev", "Design", "Data",],
        thumbnail: "bike.png",
        description: "A data story with interactive data visualizations examining biking in Toronto with comparisons to Montreal and Vancouver.",
    },
    {
        title: "Discovery of Insulin: Interactive Exhibit",
        tags: ["C", "Arduino", "AutoCAD"],
        categories: ["Web Dev", "Design",],
        thumbnail: "insulinexhibit.png",
        description: "Educational science exhibit inspired by the discovery of insulin by Frederick Banting and Charles Best. Created using custom 3D-printed models, sensors, and microcontrollers.",
    },
    {
        title: "Cooking Companion App Prototype",
        tags: ["Figma", "UI/UX Research"],
        categories: ["Design",],
        thumbnail: "cookingcompanion.png",
        description: "Designs for a social media recipe aggregator & recommendation app, with chatbot feature to aid with decision paralysis. Designed iteratively through user surveys, interviews, and testing sessions.",
    },
    // {
    //     title: "Oxtail Recipe App",
    //     tags: ["Java", "Android"],
    //     categories: ["App Dev", "Software Dev"],
    //     thumbnail: "loso.png",
    //     description: "Android app with tailored recommendations based on user activity.",
    // },
    // {
    //     title: "Toronto Fitness Club Website",
    //     tags: ["React", "Django"],
    //     categories: ["Web Dev"],
    //     thumbnail: "loso.png",
    //     description: "Full-stack website with a studio map, class scheduling, and user authentication system.",
    // },
    {
        title: "GO Service Guarantee Emails",
        tags: ["HTML", "CSS"],
        categories: ["Web Dev", "Design",],
        thumbnail: "goserviceguarantee.png",
        description: "Email templates made for the new GO Service Guarantee portal, tested extensively across email clients",
    },
]



    {/* all, design, web, software */}
    {/* 
    - add tags and filter option to do design, development, frontend, backend, data, product
    - PROJECTS LIST
        - CRM & Job Board -> 
        - oxtail recipe app
        - toronto fitness club 
    */}