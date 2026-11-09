import type { CSSProperties } from 'react';
import RevealHeading from './RevealHeading';
import { WHATSAPP_URL } from './FloatingWhatsApp';
import PilotButton from './PilotButton';

export default function ContactSection() {
  return <section id="contact" className="b2b-section b2b-contact"><div className="b2b-container b2b-contact-grid"><div>
    <p className="b2b-eyebrow" data-reveal="up">Start a conversation</p>
    <RevealHeading lines={['Have one process', <em key="e">in mind?</em>]}/>
    <p data-reveal="up" style={{ '--reveal-i': 2 } as CSSProperties}>Tell us where your team spends time searching, checking or interpreting information. We’ll tell you honestly whether AI is the right fit.</p>
    <div className="b2b-contact-details" data-reveal="up" style={{ '--reveal-i': 3 } as CSSProperties}>
      <div className="contact-detail-item"><span>Email us</span><a href="mailto:info@rootstocktech.co.in">info@rootstocktech.co.in</a></div>
      <div className="contact-detail-item"><span>Call us</span><a href="tel:+918085522102">+91 80855 22102</a></div>
      <div className="contact-detail-item"><span>Prefer chat?</span><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp us</a></div>
      <span>IIITD Innovation and Incubation Center, New Delhi</span>
    </div>
    <PilotButton className="b2b-button b2b-button-primary">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton>
  </div></div></section>;
}
