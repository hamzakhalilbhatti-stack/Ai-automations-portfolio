window.addEventListener("load", function () {

/* =====================================
   HKB AUTOMATIONS – LUXURY INTRO
===================================== */

window.addEventListener("load", function () {

const introContainer = document.getElementById("intro-container");
const canvas = document.getElementById("intro-canvas");

if (introContainer && canvas) {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060b18"); // Premium deep navy

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    /* ===== LIGHTING (Luxury Glow Setup) ===== */

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(0, 2, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffe6b3, 2, 20);
    fillLight.position.set(0, 0, 6);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    /* ===== BACKGROUND PARTICLES ===== */

    const bgGeometry = new THREE.BufferGeometry();
    const bgCount = 1200;
    const bgPositions = [];

    for (let i = 0; i < bgCount; i++) {
        bgPositions.push(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
    }

    bgGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(bgPositions, 3)
    );

    const bgMaterial = new THREE.PointsMaterial({
        color: 0x00eaff,
        size: 0.06,
        transparent: true,
        opacity: 0.4
    });

    const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgParticles);

    /* ===== LOAD TEXT ===== */

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        function (font) {

            const geo = new THREE.TextGeometry(
                "HKB AUTOMATIONS",
                {
                    font: font,
                    size: 0.85,
                    height: 0.28,
                    curveSegments: 20
                }
            );

            geo.center();

            // 🔥 Correct Luxury Champagne Gold
            const luxuryMaterial = new THREE.MeshStandardMaterial({
                color: 0xf5d27a,        // warm champagne gold
                emissive: 0x8c6a2b,     // soft gold glow
                emissiveIntensity: 0.6,
                metalness: 1,
                roughness: 0.25
            });

            const text = new THREE.Mesh(geo, luxuryMaterial);
            text.material.transparent = true;
            text.material.opacity = 0;
            scene.add(text);

            /* ===== BURST ===== */

            const burstGeometry = new THREE.BufferGeometry();
            const burstCount = 2000;
            const positions = [];
            const velocities = [];

            for (let i = 0; i < burstCount; i++) {
                positions.push(0, 0, 0);
                velocities.push(
                    (Math.random() - 0.5) * 1.2,
                    (Math.random() - 0.5) * 1.2,
                    (Math.random() - 0.5) * 1.2
                );
            }

            burstGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(positions, 3)
            );

            const burstMaterial = new THREE.PointsMaterial({
                color: 0xffd700, // brighter gold for explosion
                size: 0.1,
                transparent: true
            });

            const burst = new THREE.Points(burstGeometry, burstMaterial);
            scene.add(burst);

            let frame = 0;
            let burstStarted = false;

            function animate() {
                requestAnimationFrame(animate);
                frame++;

                // Fade in text
                if (text.material.opacity < 1 && frame < 120) {
                    text.material.opacity += 0.02;
                }

                // Subtle particle movement
                bgParticles.rotation.y += 0.0008;

                // Trigger burst
                if (frame > 180) burstStarted = true;

                if (burstStarted) {
                    const posArray = burst.geometry.attributes.position.array;

                    for (let i = 0; i < burstCount; i++) {
                        posArray[i * 3] += velocities[i * 3];
                        posArray[i * 3 + 1] += velocities[i * 3 + 1];
                        posArray[i * 3 + 2] += velocities[i * 3 + 2];
                    }

                    burst.geometry.attributes.position.needsUpdate = true;

                    text.material.opacity = Math.max(0, 1 - (frame - 180) / 60);
                }

                renderer.render(scene, camera);

                if (frame > 260) {
                    introContainer.style.opacity = "0";
                    setTimeout(() => introContainer.remove(), 1000);
                }
            }

            animate();
        }
    );

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

});
/* =====================================
   MAIN WEBSITE PARTICLE BACKGROUND
===================================== */

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
