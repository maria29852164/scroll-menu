import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useRef, useState, useEffect } from "react";
function App() {
  const containerRef = useRef(null);

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
      root.scale.set(0.2, 0.09, 0.3);
      scene.add(root);
    });
    const light = new THREE.DirectionalLight();
    light.position.set(2, 2, 5);
    scene.add(light);
    //scene.add(cube);

    camera.position.z = 3;
    function animate() {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });

  return <div ref={containerRef} />;
}

export default App;
