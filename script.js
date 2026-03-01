window.addEventListener("load", function () {

/* =====================================
   HKB AUTOMATIONS – CLEAN INTRO
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

    // ===== Simple Professional Lighting =====

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    // ===== Load Text =====

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        function (font) {

            // Main Heading
            const mainGeo = new THREE.TextGeometry(
                "HKB AUTOMATIONS",
                {
                    font: font,
                    size: 0.7,
                    height: 0.2,
                    curveSegments: 16
                }
            );

            mainGeo.center();

            const material = new THREE.MeshStandardMaterial({
                color: 0xcbb88a,   // same as your hero text
                metalness: 0.4,
                roughness: 0.6
            });

            const mainText = new THREE.Mesh(mainGeo, material);
            mainText.position.set(0, 0.5, 0);
            scene.add(mainText);

            // Sub Heading
            const subGeo = new THREE.TextGeometry(
                "Innovating the Future with Intelligent Automation",
                {
                    font: font,
                    size: 0.22,
                    height: 0.05
                }
            );

            subGeo.center();

            const subText = new THREE.Mesh(subGeo, material);
            subText.position.set(0, -0.7, 0);
            scene.add(subText);

            // ===== Clean Fade Animation =====

            let opacity = 0;

            mainText.material.transparent = true;
            subText.material.transparent = true;

            function animate() {
                requestAnimationFrame(animate);

                if (opacity < 1) {
                    opacity += 0.01;
                    mainText.material.opacity = opacity;
                    subText.material.opacity = opacity;
                }

                renderer.render(scene, camera);

                if (opacity >= 1) {
                    setTimeout(() => {
                        introContainer.style.opacity = "0";
                        setTimeout(() => introContainer.remove(), 1000);
                    }, 1800);
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
