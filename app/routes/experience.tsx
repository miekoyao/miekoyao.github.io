import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { StarIcon } from '~/icons/star';


const workStyle = {
  contentStyle: { background: 'var(--timeline-work)', color: 'var(--timeline-text)' },
  contentArrowStyle: { borderRight: '7px solid var(--timeline-work)' },
  // iconStyle: { background: 'var(--timeline-text)', fill: 'var(--timeline-work)' },
  iconStyle: { background: '#00000000' },
};


export default function Experience() {
  return <div className="experience">
    <h2>Work Experience</h2>
    <VerticalTimeline lineColor='var(--timeline-text)'>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        {...workStyle}
        date="NOV. 2025 - present"
        icon={<StarIcon/>}
      >
        <h3 className="vertical-timeline-element-title">Software Developer Research Assistant</h3>
        <h4 className="vertical-timeline-element-subtitle">School of Cities, University of Toronto</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        {...workStyle}
        date="MAY 2025 - APR. 2026"
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">Product Management Co-op Student</h3>
        <h4 className="vertical-timeline-element-subtitle">PRESTO, Metrolinx</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        {...workStyle}
        date="SEP. 2024 - APR. 2025"
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">Volunteer Product Manager</h3>
        <h4 className="vertical-timeline-element-subtitle">UofT Blueprint</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        {...workStyle}
        date="SEP. 2024 - APR. 2025"
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">Student Library Assistant</h3>
        <h4 className="vertical-timeline-element-subtitle">Map & Data Library, University of Toronto</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="SEP. 2023 - AUG. 2024"
        {...workStyle}
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">Full-stack Software Developer Intern</h3>
        <h4 className="vertical-timeline-element-subtitle">Dayforce</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="MAY 2023 - AUG. 2023"
        {...workStyle}
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">Information & Data Management Student Assistant </h3>
        <h4 className="vertical-timeline-element-subtitle">Elections Ontario</h4>
        {/* <ul className="font-medium list-disc ml-10">
          <li>dshfis</li>
        </ul> */}
      </VerticalTimelineElement>
    </VerticalTimeline>
  </div>;
}
