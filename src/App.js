import './App.css';
import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader';

import {useRef, useState,useEffect} from "react";
function App() {
    const containerRef = useRef(null);
    const [animationMixer, setAnimationMixer] = useState(null);

    useEffect(() => {
        // Configurar la escena, cámara y renderizador
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Cargar el archivo FBX y obtener la animación
        const loader = new FBXLoader();
        loader.load(`${process.env.PUBLIC_URL}/menu.glb`, (model) => {
            scene.add(model);

            // Obtener la animación del modelo
            const mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(model.animations[0]); // Puedes cambiar el índice si hay varias animaciones

            // Reproducir la animación
            action.play();
            setAnimationMixer(mixer);
        });

        // Función para actualizar la animación en cada cuadro
        const animate = () => {
            requestAnimationFrame(animate);

            // Actualizar la animación
            if (animationMixer) {
                animationMixer.update(0.016); // El tiempo delta puede variar según tu aplicación
            }

            // Renderizar la escena
            renderer.render(scene, camera);
        };

        // Iniciar la animación
        animate();

        // Limpiar la escena cuando el componente se desmonta
        return () => {
            scene.remove();
            renderer.dispose();
        };
    }, [animationMixer]);
  return (
      <div ref={containerRef} />

  );
}

export default App;
