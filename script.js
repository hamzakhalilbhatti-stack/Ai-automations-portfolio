// ===== 3D INTRO (WORKING VERSION) =====

window.addEventListener("load", function () {

    // INTRO ONLY ON INDEX
    if (window.location.pathname.includes("index") || window.location.pathname === "/") {

        const introScene = new THREE.Scene();
        const introCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const introRenderer = new THREE.WebGLRenderer({ alpha: true });
        introRenderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("intro-screen").appendChild(introRenderer.domElement);

        introCamera.position.z = 5;

        const light = new THREE.PointLight(0x00f5ff, 2);
        light.position.set(5, 5, 5);
        introScene.add(light);

        // Create 3D HKB using boxes
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f5ff,
            metalness: 0.8,
            roughness: 0.2
        });

        const group = new THREE.Group();

        function createLetter(xOffset) {
            const geometry = new THREE.BoxGeometry(0.6, 2, 0.4);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = xOffset;
            return mesh;
        }

        group.add(createLetter(-2));
        group.add(createLetter(0));
        group.add(createLetter(2));

        introScene.add(group);

        let zoomSpeed = 0.02;

        function animateIntro() {
            requestAnimationFrame(animateIntro);

            group.rotation.y += 0.03;
            group.rotation.x += 0.01;

            introCamera.position.z -= zoomSpeed;

            introRenderer.render(introScene, introCamera);

            if (introCamera.position.z < 1) {
                document.getElementById("intro-screen").style.display = "none";
            }
        }

        animateIntro();
    }

    // ===== MAIN 3D BACKGROUND FOR ALL PAGES =====

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

    const materialParticles = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.05
    });

    const particles = new THREE.Points(geometry, materialParticles);
    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

});
