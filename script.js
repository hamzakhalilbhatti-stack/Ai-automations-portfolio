// ===== 3D PARTICLE BACKGROUND =====

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1";

camera.position.z = 5;

let geometry = new THREE.BufferGeometry();
let vertices = [];

for (let i = 0; i < 1500; i++) {
    vertices.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

let material = new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 0.05
});

let particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// ===== Mouse Interaction =====

document.addEventListener("mousemove", (event) => {
    let mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    let mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

    particles.rotation.x = mouseY * 0.5;
    particles.rotation.y = mouseX * 0.5;
});

// ===== Responsive =====

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
