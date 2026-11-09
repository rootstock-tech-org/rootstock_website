const steps = [
  ['Understand', 'Identify the workflow, the people involved and the problem to solve.'],
  ['Build', 'Develop a focused solution around the available context and data.'],
  ['Validate', 'Review the result with the people who will use it.'],
  ['Deploy', 'Introduce it into the workflow and refine it over time.'],
];
export default function HomeApproach() {
  return <section id="approach" className="home-section home-approach"><div className="b2b-container"><div className="home-section-heading"><div><p className="home-eyebrow">HOW WE WORK</p><h2>From a real problem<br/><em>to a useful solution.</em></h2></div><p>Start with a focused use case and build towards something your team can use.</p></div><div className="home-steps">{steps.map(([title, text], index) => <div key={title}><span>0{index + 1} /</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}
