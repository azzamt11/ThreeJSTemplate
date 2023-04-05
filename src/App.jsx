import React, { useEffect } from "react";
import * as THREE from "three";
import createBoxWithRoundedEdges from "./RoudedBox";

function App() {
  // .............WebGL Construction................../

  //scene, camera and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer1 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer1.setSize(window.innerWidth, window.innerHeight);

  //textures
  const loader = new THREE.TextureLoader();
  const makeTexture = (x) => {
    var urls = [];
    for (let i = 0; i < 6; i++) {
      urls.push("reactLogo.png");
    }
    const texturedMaterial = urls.map((url) => {
      return new THREE.MeshBasicMaterial({
        map: loader.load(url),
      });
    });
    return texturedMaterial;
  };

  //cubes
  const makeRoundedCube = (x, y, z, s, p) => {
    const cube = new THREE.Mesh(
      new createBoxWithRoundedEdges(s, s, s, 0.25, 8),
      makeTexture(p)
    );
    cube.position.set(x, y, z);
    return cube;
  };

  const cube = makeRoundedCube(0, 0, 0, 1.5, 1);

  //rendering
  scene.add(cube);

  //animation function
  function animate() {
    requestAnimationFrame(animate);

    camera.rotation.set(-0.3, 0, 0);
    camera.position.set(0, 1, 3);
    cube.rotation.set(0.001 * window.scrollY, 0.001 * window.scrollY, 0);

    renderer1.render(scene, camera);
  }

  // ....................................................../

  //use effect

  useEffect(() => {
    renderer1.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas1").appendChild(renderer1.domElement);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    //resize function
    window.addEventListener("resize", function (e) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      renderer1.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      console.log(
        "height= " + window.innerHeight + "width= " + window.innerWidth
      );
      if ((window.innerHeight * 2.5) / 100 > 25) {
        console.log("triggered");
      }
    });

    animate();
  }, []);

  return (
    <div className="container" id="container">
      <section id="home-section">
        <div id="canvas1"></div>    {/* Bagian Canvas utk merender WEBGL */}
      </section>
    </div>
  );
}

export default App;
