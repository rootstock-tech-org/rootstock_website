export type ClientSector = 'manufacturing' | 'financial-services' | 'education' | 'partner';

export type Client = { name: string; logo: string; sector: ClientSector };

export const clientGroups: { sector: ClientSector; label: string }[] = [
  { sector: 'manufacturing', label: 'Manufacturing' },
  { sector: 'financial-services', label: 'Financial services' },
  { sector: 'education', label: 'Education' },
  { sector: 'partner', label: 'Partners' },
];

export const clients: Client[] = [
  { name: 'Action Construction Equipment (ACE)', logo: '/client_logos/ace.png', sector: 'manufacturing' },
  { name: 'JCB', logo: '/client_logos/jcb.svg', sector: 'manufacturing' },
  { name: 'Saket Metal', logo: '/client_logos/saket_metal.jpeg', sector: 'manufacturing' },
  { name: 'Definedge Securities', logo: '/client_logos/definedge.png', sector: 'financial-services' },
  { name: 'Indira Securities', logo: '/client_logos/indira-securities-pvt-ltd.avif', sector: 'financial-services' },
  { name: 'VIPS University', logo: '/client_logos/vips.png', sector: 'education' },
  { name: 'IIIT Delhi Incubation Centre', logo: '/client_logos/iiitd_ic.png', sector: 'education' },
  { name: 'Prakhar Group', logo: '/client_logos/prakhar.png', sector: 'partner' },
  { name: 'Digitech Solutions', logo: '/client_logos/Digitech.png', sector: 'partner' },
];

export const clientsBySector = (sector: ClientSector): Client[] => clients.filter(client => client.sector === sector);
