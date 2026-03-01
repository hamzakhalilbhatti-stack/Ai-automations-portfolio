window.addEventListener("load", function () {

/* =====================================
   HKB AUTOMATIONS – LUXURY INTRO
===================================== */

const introContainer = document.getElementById("intro-container");
const canvas = document.getElementById("intro-canvas");

if (introContainer && canvas) {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0f1f");

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

    // ===== Lighting =====

  const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

    // ===== Background Particles =====

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
        color: 0x00eaff,
        size: 0.05,
        transparent: true,
        opacity: 0.5
    });

    const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgParticles);

    // ===== Load Text =====

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        function (font) {

            const mainGeo = new THREE.TextGeometry(
                "THE HKB AUTOMATIONS",
                {
                    font: font,
                    size: 0.7,
                    height: 0.25,
                    curveSegments: 16
                }
            );

            mainGeo.center();

          const material = new THREE.MeshStandardMaterial({
    color: 0xcbb88a,
    metalness: 0.4,
    roughness: 0.6
});

            const mainText = new THREE.Mesh(mainGeo, material);
            mainText.position.set(0, 0.4, 0);
            scene.add(mainText);

            const subGeo = new THREE.TextGeometry(
                "innovating the future with intelligent automation",
                {
                    font: font,
                    size: 0.22,
                    height: 0.08
                }
            );

            subGeo.center();

            const subText = new THREE.Mesh(subGeo, material);
            subText.position.set(0, -0.8, 0);
            scene.add(subText);

            // ===== Burst Setup =====

            const burstGeometry = new THREE.BufferGeometry();
            const burstCount = 1200;
            const positions = [];
            const velocities = [];

            for (let i = 0; i < burstCount; i++) {
                positions.push(0, 0, 0);
                velocities.push(
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5
                );
            }

            burstGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(positions, 3)
            );

            const burstMaterial = new THREE.PointsMaterial({
                color: 0xd4af37,
                size: 0.06
            });

            const burst = new THREE.Points(burstGeometry, burstMaterial);
            scene.add(burst);

            let frame = 0;
            let burstStarted = false;

            let opacity = 0;

function animate() {
    requestAnimationFrame(animate);

    if (opacity < 1) {
        opacity += 0.01;
        mainText.material.transparent = true;
        subText.material.transparent = true;
        mainText.material.opacity = opacity;
        subText.material.opacity = opacity;
    }

    renderer.render(scene, camera);

    if (opacity >= 1) {
        setTimeout(() => {
            introContainer.style.opacity = "0";
            setTimeout(() => introContainer.remove(), 1000);
        }, 1500);
    }
}
            

                // Rotate background slowly
                bgParticles.rotation.y += 0.0006;
                bgParticles.rotation.x += 0.0002;

                // Start burst
                if (frame > 280) burstStarted = true;

                if (burstStarted) {
                    const posArray = burst.geometry.attributes.position.array;

                    for (let i = 0; i < burstCount; i++) {
                        posArray[i * 3] += velocities[i * 3];
                        posArray[i * 3 + 1] += velocities[i * 3 + 1];
                        posArray[i * 3 + 2] += velocities[i * 3 + 2];
                    }

                    burst.geometry.attributes.position.needsUpdate = true;

                    mainText.material.opacity = Math.max(0, 1 - (frame - 280) / 80);
                    subText.material.opacity = Math.max(0, 1 - (frame - 280) / 80);
                    mainText.material.transparent = true;
                    subText.material.transparent = true;
                }

                renderer.render(scene, camera);

                if (frame > 380) {
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
