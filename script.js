window.addEventListener("load", function () {

/* =====================================
   LUXURY HKB CINEMATIC INTRO + BURST
===================================== */

const introContainer = document.getElementById("intro-container");
const canvas = document.getElementById("intro-canvas");

if (introContainer && canvas) {

    const scene = new THREE.Scene();
   // ===== Subtle Floating Background Particles =====
const bgGeometry = new THREE.BufferGeometry();
const bgCount = 800;
const bgPositions = [];

for (let i = 0; i < bgCount; i++) {
    bgPositions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
    );
}

bgGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bgPositions, 3)
);

const bgMaterial = new THREE.PointsMaterial({
    color: 0x00eaff,
    size: 0.05,
    transparent: true,
    opacity: 0.6
});

const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
scene.add(bgParticles);
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.position.z = 10;

    // Luxury Background
    scene.background = new THREE.Color("#0a0f1f");

    // Strong front light (important!)
const frontLight = new THREE.DirectionalLight(0xffffff, 2);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

// Gold side light
const goldLight = new THREE.PointLight(0xd4af37, 3);
goldLight.position.set(5, 5, 5);
scene.add(goldLight);

// Cyan accent light
const cyanLight = new THREE.PointLight(0x00eaff, 2);
cyanLight.position.set(-5, -5, 5);
scene.add(cyanLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        function (font) {

            const mainGeo = new THREE.TextGeometry(
                "HKB AUTOMATIONS",
                {
                    font: font,
                    size: 0.8,
                    height: 0.3,
                    curveSegments: 16
                }
            );

            mainGeo.center();

           const mainMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,        // luxury gold
    emissive: 0x3a2a00,     // subtle glow
    emissiveIntensity: 0.6,
    metalness: 0.8,
    roughness: 0.3
});

            const mainText = new THREE.Mesh(mainGeo, mainMat);
            scene.add(mainText);

            const subGeo = new THREE.TextGeometry(
                "Engineering Intelligent Futures",
                {
                    font: font,
                    size: 0.25,
                    height: 0.1,
                }
            );

            subGeo.center();

            const subText = new THREE.Mesh(subGeo, mainMat);
            subText.position.y = -1.2;
            scene.add(subText);

            // ==========================
            // GOLD PARTICLE BURST SETUP
            // ==========================

            const burstGeometry = new THREE.BufferGeometry();
            const burstCount = 1500;
            const positions = [];
            const velocities = [];

            for (let i = 0; i < burstCount; i++) {
                positions.push(0, 0, 0);
                velocities.push(
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4
                );
            }

            burstGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(positions, 3)
            );

            const burstMaterial = new THREE.PointsMaterial({
                color: 0xd4af37,
                size: 0.05
            });

            const burst = new THREE.Points(burstGeometry, burstMaterial);
            scene.add(burst);

            let frame = 0;
            let burstStarted = false;

            function animateIntro() {
                requestAnimationFrame(animateIntro);
                frame++;
                // Cinematic camera movement
if (frame < 200) {
    camera.position.x = Math.sin(frame * 0.01) * 1.5;
    camera.position.y = Math.cos(frame * 0.01) * 0.5;
}
                // Floating luxury movement
                mainText.position.y = Math.sin(frame * 0.02) * 0.2;
                mainText.rotation.y += 0.003;

                subText.position.y = -1.2 + Math.sin(frame * 0.02) * 0.2;

                // Trigger Burst
                if (frame > 300 && !burstStarted) {
                    burstStarted = true;
                }

                if (burstStarted) {
                    const posArray = burst.geometry.attributes.position.array;

                    for (let i = 0; i < burstCount; i++) {
                        posArray[i * 3] += velocities[i * 3];
                        posArray[i * 3 + 1] += velocities[i * 3 + 1];
                        posArray[i * 3 + 2] += velocities[i * 3 + 2];
                    }

                    burst.geometry.attributes.position.needsUpdate = true;

                    mainText.material.opacity = Math.max(0, 1 - (frame - 300) / 100);
                    subText.material.opacity = Math.max(0, 1 - (frame - 300) / 100);
                    mainText.material.transparent = true;
                    subText.material.transparent = true;
                }
// Slow rotation of background particles
bgParticles.rotation.y += 0.0008;
bgParticles.rotation.x += 0.0003;
                renderer.render(scene, camera);

                // Exit to website
                if (frame > 420) {
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
