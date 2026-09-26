import ContactForm from "~/components/contactForm";
import Email from '../icons/email.svg?react';
import Linkedin from '../icons/linkedin.svg?react';
import Github from '../icons/github.svg?react';
import { StarCount } from "~/components/starCount";
import { useStarStats } from "~/components/starStatsContext";
import { CurvedText } from "~/components/curvedText";


export default function Contact() {
  const { hoveredCount, clickedCount, connectedCount } = useStarStats();
  return (
  <div className="flex justify-center gap-15">
    <div className="flex flex-col w-40 justify-center gap-1">
      <div className="relative flex flex-col w-40 gap-7 justify-center">
        <div className="absolute -top-11">
          <CurvedText text="MY LINKS" width={200} height={200} reversed={false} offsetDegrees={200} pClasses="tracking-md font-bold text-xl"/>
        </div>
        <a href="https://www.linkedin.com/in/miekoyao" className="social-link w-25 h-25 self-end" target="_blank">
          <Linkedin/>
          <p>linkedin</p>
        </a>
        <a href="https://www.github.com/miekoyao" className="social-link w-25 h-25 self-start" target="_blank">
          <Github/>
          <p>github</p>
        </a>
        <a href="mailto:miekoyao@gmail.com" className="social-link w-25 h-25 self-end" target="_blank">
          <Email/>
          <p>email</p>
        </a>
      </div>
    </div>

    <div>
      <h2>Say hi!</h2>
      <ContactForm/>
    </div>    

    <div className="relative flex flex-col w-45 justify-center">
      <div className="relative flex flex-col w-45 gap-5 justify-center">
        <div className="absolute -top-10">
          <CurvedText text="YOUR STATS" width={200} height={200} reversed={false} offsetDegrees={270} pClasses="tracking-md font-bold text-xl"/>
        </div>
        <div className="h-27 flex flex-col items-center gap-2 self-start">
          <StarCount num={hoveredCount}/>
          <p>stars hovered</p>
        </div>
        <div className="h-27 flex flex-col items-center gap-2 self-end">
          <StarCount num={clickedCount}/>
          <p>stars clicked</p>
        </div>
        <div className="h-27 flex flex-col items-center gap-2 self-start">
          <StarCount num={connectedCount}/>
          <p>stars connected</p>
        </div>
      </div>
    </div>
  </div>);
}
