window.addEventListener("load", function () {

    /* ===== 3D INTRO (INDEX ONLY) ===== */

    

    /* ===== MAIN 3D BACKGROUND ===== */

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";

    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    const geometryParticles = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 2000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25
        );
    }

    geometryParticles.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    const materialParticles = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.05
    });

    const particles = new THREE.Points(geometryParticles, materialParticles);
    scene.add(particles);

    function animateBackground() {
        requestAnimationFrame(animateBackground);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animateBackground();

});
