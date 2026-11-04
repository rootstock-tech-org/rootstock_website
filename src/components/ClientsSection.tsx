import Image from 'next/image';
import type { CSSProperties } from 'react';
import { clientGroups, clientsBySector } from '@/data/clients';

export default function ClientsSection() {
  let logoIndex = 0;
  return <section id="work" className="calm-clients" aria-labelledby="clients-heading"><div className="b2b-container">
    <p id="clients-heading" className="b2b-eyebrow" data-reveal="up">Selected clients & collaborators</p>
    <div className="b2b-client-groups">
      {clientGroups.map((group, groupIndex) => <div key={group.sector} className="b2b-client-group" data-reveal="draw" style={{ '--reveal-i': groupIndex } as CSSProperties}>
        <h3>{group.label}</h3>
        <ul>{clientsBySector(group.sector).map(client => <li key={client.name} title={client.name} data-reveal="up" style={{ '--reveal-i': logoIndex++ } as CSSProperties}><Image src={client.logo} alt={client.name} width={140} height={48}/></li>)}</ul>
      </div>)}
    </div>
  </div></section>;
}
