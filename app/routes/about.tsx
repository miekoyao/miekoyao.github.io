export default function About() {
  return <>
    <div className="flex justify-center items-center gap-15 flex-wrap grid2:flex-nowrap">
      <div>
        <h2 className="bg-slate-50 dark:bg-slate-950">A Little Introduction</h2>
        <p className="bg-slate-50 dark:bg-slate-950 pb-5">I'm a recent graduate from the University of Toronto with an Honours Bachelor of Science, where I double majored in Computer Science and Quantitative Biology. I have a diverse range of experience spanning web development, software engineering, UI/UX design, product management, and business analysis. I love staying adaptable, applying my expertise and learning new skills to collaborate effectively with my teammates.</p>
        <p className="bg-slate-50 dark:bg-slate-950">In my spare time, I enjoy making pottery and trying new bubble tea spots around Toronto!</p>
      </div>
      <img src="/assets/mieko2.png" className="w-100"/>
    </div>
  </>;
}
