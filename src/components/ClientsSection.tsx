import Image from 'next/image';

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
  return <section id="work" className="calm-clients"><div className="b2b-container"><p className="b2b-eyebrow">Selected clients & collaborators</p><div className="calm-logo-grid">{logos.map(logo => <figure key={logo.name}><Image src={logo.src} alt={logo.name} width={150} height={54}/><figcaption>{logo.name}</figcaption></figure>)}</div></div></section>;
}
