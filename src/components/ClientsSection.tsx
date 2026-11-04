import Image from 'next/image';
import { clientGroups, clientsBySector } from '@/data/clients';

export default function ClientsSection() {
  return <section id="work" className="calm-clients" aria-labelledby="clients-heading"><div className="b2b-container">
    <p className="b2b-eyebrow">Selected clients & collaborators</p>
    <h2 id="clients-heading" className="calm-clients-title">Intelligence, <em>engineered.</em></h2>
    <div className="b2b-client-groups">
      {clientGroups.map(group => <div key={group.sector} className="b2b-client-group">
        <h3>{group.label}</h3>
        <ul>{clientsBySector(group.sector).map(client => <li key={client.name} title={client.name}><Image src={client.logo} alt={client.name} width={140} height={48}/></li>)}</ul>
      </div>)}
    </div>
  </div></section>;
}
