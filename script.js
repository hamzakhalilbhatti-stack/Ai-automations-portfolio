// ===== CLEAN INTRO FIX =====

window.addEventListener("load", function () {

    if (window.location.pathname.includes("index") || window.location.pathname === "/") {

        const introScreen = document.getElementById("intro-screen");

        const introScene = new THREE.Scene();
        const introCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const introRenderer = new THREE.WebGLRenderer({ alpha: true });
        introRenderer.setSize(window.innerWidth, window.innerHeight);
        introScreen.appendChild(introRenderer.domElement);

        introCamera.position.z = 5;

        const light = new THREE.PointLight(0x00f5ff, 2);
        light.position.set(5, 5, 5);
        introScene.add(light);

        const material = new THREE.MeshStandardMaterial({
            color: 0x00f5ff,
            metalness: 0.8,
            roughness: 0.2
        });

        const geometry = new THREE.BoxGeometry(2, 2, 0.5);
        const cube = new THREE.Mesh(geometry, material);
        introScene.add(cube);

        let progress = 0;

        function animateIntro() {
            requestAnimationFrame(animateIntro);

            progress += 0.02;

            cube.rotation.x += 0.03;
            cube.rotation.y += 0.03;

            introCamera.position.z -= 0.02;

            introRenderer.render(introScene, introCamera);

            if (progress > 3) {
                introScreen.remove();   // 🔥 THIS FIXES BLACK SCREEN
            }
        }

        animateIntro();
    }

});

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
