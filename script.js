window.addEventListener("load", function () {

    /* =============================
       3D FLOATING TEXT INTRO
    ============================== */

    const introContainer = document.getElementById("intro-container");
    const canvas = document.getElementById("intro-canvas");

    if (introContainer && canvas) {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.position.z = 5;

        const light = new THREE.PointLight(0x00f5ff, 2);
        light.position.set(5, 5, 5);
        scene.add(light);

        const loader = new THREE.FontLoader();

        loader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            function (font) {

                const geometry = new THREE.TextGeometry(
                    "Welcome to HKB Automations",
                    {
                        font: font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 12
                    }
                );

                geometry.center();

                const material = new THREE.MeshStandardMaterial({
                    color: 0x00f5ff,
                    metalness: 0.8,
                    roughness: 0.2
                });

                const textMesh = new THREE.Mesh(geometry, material);
                scene.add(textMesh);

                let frame = 0;

                function animateIntro() {
                    requestAnimationFrame(animateIntro);

                    frame++;

                    textMesh.rotation.y += 0.01;
                    textMesh.position.y = Math.sin(frame * 0.05) * 0.3;

                    renderer.render(scene, camera);

                    if (frame > 300) {
                        introContainer.style.opacity = "0";
                        setTimeout(() => {
                            introContainer.remove();
                        }, 1000);
                    }
                }

                animateIntro();
            }
        );
    }

    /* =============================
       MAIN PARTICLE BACKGROUND
    ============================== */

    const sceneBg = new THREE.Scene();
    const cameraBg = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const rendererBg = new THREE.WebGLRenderer({ alpha: true });
    rendererBg.setSize(window.innerWidth, window.innerHeight);
    rendererBg.domElement.style.position = "fixed";
    rendererBg.domElement.style.top = "0";
    rendererBg.domElement.style.left = "0";
    rendererBg.domElement.style.zIndex = "-1";

    document.body.appendChild(rendererBg.domElement);

    cameraBg.position.z = 5;

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
    sceneBg.add(particles);

    function animateBackground() {
        requestAnimationFrame(animateBackground);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        rendererBg.render(sceneBg, cameraBg);
    }

    animateBackground();
});
