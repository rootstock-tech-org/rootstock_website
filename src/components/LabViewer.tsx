'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type LabKind = 'circuit' | 'mechanics';

type Props = { lab: LabKind; focus: string };

export default function LabViewer({ lab, focus }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setAvailable(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(6.5, 5.4, 7.5);
    camera.lookAt(0, 0, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(4, 8, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xbddbd4, 1.1);
    fill.position.set(-5, 4, -3);
    scene.add(fill);

    const model = new THREE.Group();
    scene.add(model);
    const material = (color: number, part?: string) => new THREE.MeshStandardMaterial({
      color,
      metalness: .13,
      roughness: .65,
      emissive: part === focus ? 0x2c8b7e : 0x000000,
      emissiveIntensity: part === focus ? .4 : 0,
    });
    const box = (width: number, height: number, depth: number, color: number, x: number, y: number, z: number, part?: string) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color, part));
      mesh.position.set(x, y, z);
      model.add(mesh);
      return mesh;
    };
    const cylinder = (radius: number, height: number, color: number, x: number, y: number, z: number, part?: string) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 24), material(color, part));
      mesh.position.set(x, y, z);
      model.add(mesh);
      return mesh;
    };

    if (lab === 'circuit') {
      box(5.2, .14, 3.3, 0x1d615b, 0, 0, 0);
      for (const [x, z, w] of [[-1.4, -.9, 1.7], [.15, -.9, 1.2], [-.35, .5, 2.7], [1.55, .5, .8]] as const) {
        box(w, .012, .045, 0xb8c9be, x, .083, z, 'path');
      }
      for (const [x, z, d] of [[-1.1, -.2, 1.2], [1, -.2, 1.1]] as const) {
        box(.045, .012, d, 0xb8c9be, x, .083, z, 'path');
      }
      box(.78, .42, .55, 0x25363b, -1.8, .29, -.95, 'power');
      box(.42, .43, .55, 0xc4c8c2, -2.32, .29, -.95, 'power');
      const resistor = cylinder(.16, .82, 0xa6bbae, -.35, .23, .55, 'resistor');
      resistor.rotation.z = Math.PI / 2;
      for (const x of [-.56, -.38, -.2]) box(.045, .34, .33, 0x526b5d, x, .24, .55, 'resistor');
      cylinder(.23, .45, 0x304a54, .95, .32, -.92, 'capacitor');
      cylinder(.15, .35, 0x83b8a5, 1.68, .3, .55, 'led');
      for (const [x, z] of [[-2.3, 1.25], [2.3, 1.25], [-2.3, -1.25], [2.3, -1.25]] as const) {
        cylinder(.07, .02, 0xc2d5cd, x, .09, z);
      }
    } else {
      box(5.3, .13, 3.3, 0xd9e2dc, 0, -.8, 0);
      const pivot = new THREE.Mesh(new THREE.ConeGeometry(.55, 1.2, 3), material(0x34655f, 'pivot'));
      pivot.position.set(0, -.13, 0);
      pivot.rotation.y = Math.PI / 2;
      model.add(pivot);
      const beam = box(4.5, .15, .5, 0x9ab2a3, 0, .48, 0, 'beam');
      beam.rotation.z = -.12;
      cylinder(.34, .45, 0x435963, -1.55, .27, 0, 'load');
      cylinder(.22, .3, 0x537e76, 1.55, .65, 0, 'force');
      for (const x of [-1.6, -1, 1, 1.6]) box(.025, .02, .4, 0x3f5b58, x, .5 - .12 * x, 0, 'beam');
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = .2;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.target.set(0, 0, 0);
    controls.update();
    const render = () => renderer.render(scene, camera);
    controls.addEventListener('change', render);
    const onKeyDown = (event: KeyboardEvent) => {
      const step = Math.PI / 18;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      if (event.key === 'ArrowLeft') spherical.theta -= step;
      else if (event.key === 'ArrowRight') spherical.theta += step;
      else if (event.key === 'ArrowUp') spherical.phi = Math.max(.25, spherical.phi - step);
      else if (event.key === 'ArrowDown') spherical.phi = Math.min(Math.PI / 2.1, spherical.phi + step);
      else return;
      event.preventDefault();
      camera.position.copy(new THREE.Vector3().setFromSpherical(spherical).add(controls.target));
      controls.update();
      render();
    };
    host.addEventListener('keydown', onKeyDown);
    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    return () => {
      observer.disconnect();
      controls.removeEventListener('change', render);
      host.removeEventListener('keydown', onKeyDown);
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((item) => item.dispose());
        }
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [lab, focus]);

  return <div className="b2b-lab-canvas" ref={mount} role="img" tabIndex={0} aria-label={`${lab === 'circuit' ? 'Interactive 3D circuit board' : 'Interactive 3D lever'}; drag or use arrow keys to rotate`}>{!available && <p>3D preview is unavailable on this device. Use the lesson controls to explore the lab.</p>}</div>;
}
