export interface CardProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  tags: Array<string>;
  categories: Array<string>;
  thumbnail: string;
  description: string;
  demo?: string;
  repo?: string;
}

export const projects: Array<CardProps> = [
    {
        title: "Local Solutions",
        tags: ["Svelte", "Figma", "Inkscape"],
        categories: ["Web Dev", "Design",],
        thumbnail: "loso.png",
        description: "A website showcasing winners of the School of Cities Local Solutions contest, for organizations solving place-based challenges.",
        demo: "https://schoolofcities.github.io/local-solutions",
        repo: "https://github.com/schoolofcities/local-solutions",
    },
    {
        title: "Designing Deliberation: Framework Builder Tool",
        tags: ["Svelte", "Figma"],
        categories: ["Web Dev", "Design",],
        thumbnail: "deliberation.png",
        description: "An interactive toolkit for urban practitioners to design high-level public engagement plans.",
        demo: "https://schoolofcities.github.io/designing-deliberation/interactive-tool/framework",
        repo: "https://github.com/schoolofcities/designing-deliberation",
    },
    {
        title: "Transit Oriented Development Scrollytelling",
        tags: ["Svelte"],
        categories: ["Web Dev", "Design",],
        thumbnail: "tod.png",
        description: "Animated scroll-style webpages featuring case studies and research articles about Transit Oriented Design in Canada.",
        demo: "https://schoolofcities.github.io/tod-canada/case-study/arbutus",
        repo: "https://github.com/schoolofcities/tod-canada",
    },
    {
        title: "Transporting around Toronto",
        tags: ["D3.js", "Tableau"],
        categories: ["Web Dev", "Design", "Data",],
        thumbnail: "bike.png",
        description: "A data story with interactive data visualizations examining biking in Toronto with comparisons to Montreal and Vancouver. Utilized government data and bikeshare GTFS feeds.",
        demo: "https://polite-wave-03b233410.7.azurestaticapps.net/",
        repo: "https://github.com/miekoyao/bike-data",
    },
    {
        title: "Discovery of Insulin: Interactive Exhibit",
        tags: ["C", "Arduino", "AutoCAD"],
        categories: ["Web Dev", "Design",],
        thumbnail: "insulinexhibit.png",
        description: "Educational science exhibit inspired by the discovery of insulin by Frederick Banting and Charles Best. Created using custom 3D-printed models, sensors, and microcontrollers.",
        demo: "https://miekoyao.github.io/history-of-insulin-project/",
        repo: "https://github.com/miekoyao/history-of-insulin-project",
    },
    {
        title: "Cooking Companion App Prototype",
        tags: ["Figma", "UI/UX Research"],
        categories: ["Design",],
        thumbnail: "cookingcompanion.png",
        description: "Designs for a social media recipe aggregator & recommendation app, with chatbot feature to aid with decision paralysis. Designed iteratively through user surveys, interviews, and testing sessions.",
        demo: "https://www.figma.com/proto/Y898LmI3wB0IGv067sQz0M/Cooking-companion?node-id=1104-29478&p=f&t=mj7f4ZneJmjOnnX8-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A497&starting-point-node-id=1104%3A29478&show-proto-sidebar=1",
        repo: "https://www.figma.com/design/Y898LmI3wB0IGv067sQz0M/Cooking-companion?node-id=1-497&t=7I23nmNCrupnSe6q-1",
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
        description: "Email templates developed for the new GO Service Guarantee portal, tested extensively across email clients.",
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