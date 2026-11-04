import Image from 'next/image';

const engagements = [
  {
    label: 'FINANCIAL SERVICES',
    client: 'Definedge Securities',
    title: 'Assistants for research and strategy teams',
    detail: 'Integration, strategy and co-pilot workflows built around the firm’s market data and principles.',
    status: 'In production',
    logo: '/client_logos/definedge.png',
    logoAlt: 'Definedge Securities',
  },
  {
    label: 'MANUFACTURING',
    client: 'Action Construction Equipment (ACE)',
    title: 'From engineering drawing to costing workflow',
    detail: 'A drawing reader that supports bills of material, component costs and design-change review.',
    status: 'Client engagement',
    logo: '/client_logos/ace.png',
    logoAlt: 'Action Construction Equipment',
  },
  {
    label: 'EDUCATION',
    client: 'Engineering education',
    title: 'Individual support for technical learning',
    detail: 'Tutor, learner and technician experiences designed around institutional learning material.',
    status: 'Pilot completed',
    logo: null,
    logoAlt: null,
  },
];

const logos = [
  { name: 'Definedge Securities', src: '/client_logos/definedge.png' },
  { name: 'Action Construction Equipment (ACE)', src: '/client_logos/ace.png' },
  { name: 'JCB', src: '/client_logos/jcb.svg' },
  { name: 'Indira Securities', src: '/client_logos/indira-securities-pvt-ltd.avif' },
  { name: 'VIPS University', src: '/client_logos/vips.png' },
  { name: 'IIIT Delhi Incubation Centre', src: '/client_logos/iiitd_ic.png' },
  { name: 'Prakhar Group', src: '/client_logos/prakhar.png' },
  { name: 'Digitech Solutions', src: '/client_logos/Digitech.png' },
];

export default function ClientsSection() {
  return (
    <section id="work" className="b2b-section b2b-work">
      <div className="b2b-container">
        <div className="b2b-section-heading b2b-heading-light">
          <div><p className="b2b-eyebrow">01 / Selected work</p><h2>Proof lives in<br /><em>the process.</em></h2></div>
          <p>Work with real teams, real data and the operating conditions that shape a useful system.</p>
        </div>
        <div className="b2b-work-grid">
          {engagements.map((item) => (
            <article className="b2b-work-card" key={item.title}>
              <div className="b2b-work-card-top"><span>{item.label}</span><span className="b2b-status">{item.status}</span></div>
              {item.logo && item.logoAlt && <div className="b2b-work-card-logo"><Image src={item.logo} alt={item.logoAlt} width={170} height={80} /></div>}
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="b2b-work-card-bottom">{item.client}<span aria-hidden="true">↗</span></div>
            </article>
          ))}
        </div>
        <div className="b2b-logo-strip">
          <span>SELECTED CLIENTS & COLLABORATORS</span>
          <div>{logos.map((logo) => <figure className="b2b-logo" key={logo.name}><Image src={logo.src} alt={logo.name} width={150} height={54} /><figcaption>{logo.name}</figcaption></figure>)}</div>
        </div>
      </div>
    </section>
  );
}
