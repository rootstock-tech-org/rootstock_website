'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function ParticlesBackground() {
  useEffect(() => {
    // Load particles.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#7AE582', '#16BAC5', '#0B3762', '#5FBFF9']
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              },
              polygon: {
                nb_sides: 5
              }
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.5,
                sync: false
              }
            },
            size: {
              value: 3.5,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 2,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#7AE582',
              opacity: 0.5,
              width: 1.2
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 100,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 100,
                size: 20,
                duration: 2,
                opacity: 0.8,
                speed: 3
              },
              repulse: {
                distance: 100,
                duration: 0.8
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
        background: 'transparent'
      }}
    />
  );
}