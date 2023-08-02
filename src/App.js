import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  const containerRef = useRef(null);
  const modelRef = useRef(null); // Ref para acceder al modelo
  const animationRef = useRef(null); // Ref para acceder a la animación

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

    const loader = new GLTFLoader();
    loader.load(`${process.env.PUBLIC_URL}/menu.glb`, (glb) => {

      const model = glb.scene;

      model.scale.set(0.03, 0.3, 0.6);
      model.rotation.y = -1.5;
      model.rotation.x = 0.4;

      // Crear un nuevo material de color verde
      const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

      // Recorrer todas las mallas del modelo y aplicar el nuevo material

      model.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          // Verificar si el material tiene un mapa de textura
          if (material.map) {
            // Si el material ya tiene un mapa de textura, no es necesario hacer nada aquí.
          } else {
            // Si el material no tiene un mapa de textura, cargamos y asignamos la textura
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
              `${process.env.PUBLIC_URL}/ruta_de_la_textura.jpg`,
              (texture) => {
                // Asignar la textura al material
                material.map = texture;
                material.needsUpdate = true; // Actualizar el material para reflejar los cambios
              }
            );
          }
        }
      });
      scene.add(model);
      modelRef.current = model; // Asignar el modelo al ref para acceder desde animate

      // Iniciar la animación del modelo (si existe)
      if (model.animations && model.animations.length > 0) {
        animationRef.current = new THREE.AnimationMixer(model);
        const action = animationRef.current.clipAction(model.animations[0]);
        action.play();
      }
    });

    const light = new THREE.DirectionalLight();
    light.position.set(5, 5, 10);
    light.rotation.x += 0.01;
    light.rotation.y += 0.01;
    
    scene.add(light);


     camera.position.z = 3;
    // camera.position.y = 2
    // camera.position.x = 3;

    function animate() {
      setTimeout(() => {
        requestAnimationFrame(animate);

        // Verificar si la animación está en progreso y actualizarla
        if (animationRef.current) {
          animationRef.current.update(0.01); // Tiempo delta para la actualización de la animación
        }


        // Verificar si el modelo está disponible antes de aplicar la rotación
        if (modelRef.current) {
          //   modelRef.current.rotation.x += 0.01; // Ajusta la velocidad de rotación aquí
        }

        renderer.render(scene, camera);
      }, 500);
    }

    animate();
  }, []);

  return <div ref={containerRef} />;
}

export default App;
