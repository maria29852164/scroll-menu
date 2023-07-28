import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useRef, useState, useEffect } from "react";
import { MeshStandardMaterial } from "three";
function App() {
  const containerRef = useRef(null);

  const rootRef = useRef(null); // Ref para acceder al root

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    //const geometry = new THREE.BoxGeometry(1, 1, 1);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    const loader = new GLTFLoader();
    loader.load(`${process.env.PUBLIC_URL}/menu.glb`, (glb) => {
      const root = glb.scene;
      root.scale.set(0.2, 0.07, 0.4);
      root.traverse((child) => {
        if (child.isMesh) {
          // Crear un nuevo material de color verde
          const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
          });

          // Aplicar el nuevo material a la malla
          child.material = material;
        }
      });
      rootRef.current = root;

      scene.add(root);
    });
    const light = new THREE.DirectionalLight();
    light.position.set(2, 2, 5);
    scene.add(light);
    //scene.add(cube);

    camera.position.z = 3;
    camera.position.x = -1;
    function animate() {
      setTimeout(() => {
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        // Acceder al root y aplicar rotación gradual en cada frame
        if (rootRef.current) {
          console.log("frame");
          rootRef.current.rotation.y += 0.01;
          rootRef.current.rotation.x += 0.02;
        }
        renderer.render(scene, camera);
      }, 600);
    }
    animate();
  });

  return <div ref={containerRef} />;
}

export default App;
