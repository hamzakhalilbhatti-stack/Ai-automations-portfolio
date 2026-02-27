// ===== 3D INTRO LOGO (INDEX PAGE ONLY) =====

if (window.location.pathname.includes("index") || window.location.pathname === "/") {

    const introScene = new THREE.Scene();
    const introCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const introRenderer = new THREE.WebGLRenderer({ alpha: true });
    introRenderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("intro-screen").appendChild(introRenderer.domElement);

    introCamera.position.z = 5;

    const light = new THREE.PointLight(0x00f5ff, 2);
    light.position.set(5, 5, 5);
    introScene.add(light);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        const geometry = new THREE.TextGeometry("HKB", {
            font: font,
            size: 1.5,
            height: 0.3,
        });

        const material = new THREE.MeshStandardMaterial({
            color: 0x00f5ff,
            metalness: 0.8,
            roughness: 0.2,
        });

        const textMesh = new THREE.Mesh(geometry, material);
        geometry.center();
        introScene.add(textMesh);

        let time = 0;

        function animateIntro() {
            requestAnimationFrame(animateIntro);
            time += 0.01;

            textMesh.rotation.y += 0.02;
            textMesh.rotation.x = Math.sin(time) * 0.3;

            introCamera.position.z -= 0.01;

            introRenderer.render(introScene, introCamera);

            if (introCamera.position.z < 1) {
                document.getElementById("intro-screen").style.display = "none";
            }
        }

        animateIntro();
    });
}
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
