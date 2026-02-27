// ===== GLOBAL 3D BACKGROUND FOR ALL PAGES =====

window.addEventListener("load", function () {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";

    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 2000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25
        );
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.05
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    // Mouse interaction
    document.addEventListener("mousemove", function (event) {
        const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

        particles.rotation.x = mouseY * 0.5;
        particles.rotation.y = mouseX * 0.5;
    });

    // Responsive
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});
