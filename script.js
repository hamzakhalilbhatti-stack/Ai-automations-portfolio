window.addEventListener("load", function () {

/* =====================================
   HKB AUTOMATIONS – INTRO
===================================== */

const introContainer = document.getElementById("intro-container");
const canvas = document.getElementById("intro-canvas");

if (introContainer && canvas) {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060b18");

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

    /* ===== LIGHTING ===== */

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(0, 2, 10);
    scene.add(keyLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    /* ===== BACKGROUND PARTICLES ===== */

    const bgGeometry = new THREE.BufferGeometry();
    const bgCount = 1000;
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
        color: 0x00f5ff,
        size: 0.06,
        transparent: true,
        opacity: 0.4
    });

    const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgParticles);

    /* ===== LOAD MAIN TEXT (ONLY ONE) ===== */

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        function (font) {

            const geo = new THREE.TextGeometry(
                "THE HKB AUTOMATIONS",
                {
                    font: font,
                    size: 0.85,
                    height: 0.28,
                    curveSegments: 20
                }
            );

            geo.center();

            // Restored Luxury Gold
            const mainMaterial = new THREE.MeshStandardMaterial({
                color: 0xf5d27a,
                metalness: 1,
                roughness: 0.3
            });

            const text = new THREE.Mesh(geo, mainMaterial);
            text.material.transparent = true;
            text.material.opacity = 0;
            scene.add(text);

            /* ===== BURST ===== */

            const burstGeometry = new THREE.BufferGeometry();
            const burstCount = 1800;
            const positions = [];
            const velocities = [];

            for (let i = 0; i < burstCount; i++) {
                positions.push(0, 0, 0);
                velocities.push(
                    (Math.random() - 0.5) * 1.4,
                    (Math.random() - 0.5) * 1.4,
                    (Math.random() - 0.5) * 1.4
                );
            }

            burstGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(positions, 3)
            );

            const burstMaterial = new THREE.PointsMaterial({
                color: 0x00f5ff,
                size: 0.14,
                transparent: true,
                opacity: 0.9
            });

            const burst = new THREE.Points(burstGeometry, burstMaterial);
            scene.add(burst);

            let frame = 0;
            let burstStarted = false;

            function animate() {
                requestAnimationFrame(animate);
                frame++;

                if (text.material.opacity < 1 && frame < 100) {
                    text.material.opacity += 0.02;
                }

                bgParticles.rotation.y += 0.0008;

                if (frame > 160) burstStarted = true;

                if (burstStarted) {
                    const posArray = burst.geometry.attributes.position.array;

                    for (let i = 0; i < burstCount; i++) {
                        posArray[i * 3] += velocities[i * 3];
                        posArray[i * 3 + 1] += velocities[i * 3 + 1];
                        posArray[i * 3 + 2] += velocities[i * 3 + 2];
                    }

                    burst.geometry.attributes.position.needsUpdate = true;

                    text.material.opacity = Math.max(0, 1 - (frame - 160) / 60);
                }

                renderer.render(scene, camera);

                if (frame > 240) {
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
