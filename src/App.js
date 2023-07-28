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
      root.scale.set(0.5, 0.5, 0.5);
      scene.add(root);
    });
    const light = new THREE.DirectionalLight();
    light.position.set(2, 2, 5);
    scene.add(light);
    //scene.add(cube);

    camera.position.z = 5;
    function animate() {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });

  // useEffect(() => {
  //     // Configurar la escena, cámara y renderizador
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //     camera.position.z = 5;
  //     const renderer = new THREE.WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     containerRef.current.appendChild(renderer.domElement);

  //     // Cargar el archivo FBX y obtener la animación
  //     const loader = new FBXLoader();
  //     loader.load(`${process.env.PUBLIC_URL}/menu.glb`, (model) => {
  //         scene.add(model);

  //         // Obtener la animación del modelo
  //         const mixer = new THREE.AnimationMixer(model);
  //         const action = mixer.clipAction(model.animations[0]); // Puedes cambiar el índice si hay varias animaciones

  //         // Reproducir la animación
  //         action.play();
  //         setAnimationMixer(mixer);
  //     });

  //     // Función para actualizar la animación en cada cuadro
  //     const animate = () => {
  //         requestAnimationFrame(animate);

  //         // Actualizar la animación
  //         if (animationMixer) {
  //             animationMixer.update(0.016); // El tiempo delta puede variar según tu aplicación
  //         }

  //         // Renderizar la escena
  //         renderer.render(scene, camera);
  //     };

  //     // Iniciar la animación
  //     animate();

  //     // Limpiar la escena cuando el componente se desmonta
  //     return () => {
  //         scene.remove();
  //         renderer.dispose();
  //     };
  // }, [animationMixer]);
  return <div ref={containerRef} />;
}

export default App;
