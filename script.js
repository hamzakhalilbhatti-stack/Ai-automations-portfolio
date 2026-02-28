window.addEventListener("load", function () {

/* =============================
   LUXURY FUTURISTIC INTRO
============================= */

const introContainer = document.getElementById("intro-container");
const canvas = document.getElementById("intro-canvas");

if (introContainer && canvas) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        55,
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

    camera.position.z = 8;

    // Premium lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const goldLight = new THREE.PointLight(0xd4af37, 2.5);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x00eaff, 2);
    cyanLight.position.set(-5, -5, 5);
    scene.add(cyanLight);

    const loader = new THREE.FontLoader();

    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
        function (font) {

            const geometry = new THREE.TextGeometry(
                "WELCOME",
                {
                    font: font,
                    size: 0.8,
                    height: 0.3,
                    curveSegments: 16
                }
            );

            geometry.center();

            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0.15,
                clearcoat: 1,
                clearcoatRoughness: 0
            });

            const textMesh = new THREE.Mesh(geometry, material);
            scene.add(textMesh);

            let frame = 0;

            function animateIntro() {
                requestAnimationFrame(animateIntro);

                frame++;

                // Slow luxury float
                textMesh.position.y = Math.sin(frame * 0.02) * 0.3;

                // Very smooth rotation
                textMesh.rotation.y += 0.003;

                // Cinematic zoom in
                if (camera.position.z > 5) {
                    camera.position.z -= 0.01;
                }

                renderer.render(scene, camera);

                // Fade out
                if (frame > 450) {
                    introContainer.style.opacity = "0";
                    setTimeout(() => {
                        introContainer.remove();
                    }, 1200);
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
