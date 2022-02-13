// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
var cameraGroup = new THREE.Group();
cameraGroup.add(camera);
scene.add(cameraGroup)
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });

// Configure renderer clear color
renderer.setClearColor( 0x000000, 0 );

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.SphereGeometry( 1, 3, 120,0,6.3,0,6.3);
var geometry2 = new THREE.DodecahedronGeometry( 1.5, 0);
var geometry3 = new THREE.RingGeometry( 2, 2.5,1,10,0,6.3);
var geometry4 = new THREE.TorusKnotGeometry( 3.7, 0.1,300,3,7,1);
var material = new THREE.MeshNormalMaterial( { color: "#433F81" } );
var material2 = new THREE.MeshNormalMaterial( { color: "#433F81" } );
var sphere = new THREE.Mesh( geometry, material );
var dode = new THREE.Mesh( geometry2, material );
var ring = new THREE.Mesh( geometry3, material );
var torus = new THREE.Mesh( geometry4, material2 );
// var controls = new THREE.OrbitControls( camera, renderer.domElement );
// Add cube to Scene
scene.add( sphere ,dode,torus);
let originalRotationY = cameraGroup.rotation.y
let originalRotationX = cameraGroup.rotation.x
// Render Loop
function parseToAngle(x) {
  return Math.PI * (x - (window.innerWidth / 2)) / window.innerWidth
}
function parseToAngle(y) {
  return Math.PI * (y - (window.innerWidth / 2)) / window.innerHeight
}

window.addEventListener('mousemove', function(e) {
  cameraGroup.rotation.y = originalRotationY + parseToAngle(e.clientX)
  console.log(originalRotationY)
  cameraGroup.rotation.x = originalRotationX + parseToAngle(e.clientY)
})

// 當視窗大小發生更動時，執行以下函式
window.addEventListener('resize', function(e) {
  // 相機長寬比例更變
  camera.aspect = window.innerWidth/window.innerHeight;
  // 重新計算相機投影矩陣
  camera.updateProjectionMatrix();
  // 渲染器大小更動，總之讓 canvas 大小會改變
  renderer.setSize( window.innerWidth, window.innerHeight );
})

var render = function () {
  requestAnimationFrame( render );
  // window.addEventListener('mousemove', () => {})
  sphere.rotation.x += 0.009;
  sphere.rotation.y += 0.009;
  dode.rotation.x -= 0.01;
  dode.rotation.y -= 0.01;
  ring.rotation.x -= 0.011;
  ring.rotation.y -= 0.011;
  torus.rotation.x -= 0.005;
  // torus.rotation.y -= 0.005;
//   cube.rotation.z += 0.01;
//   cube.position.x += 0.01;
//   cube.position.y += 0.01;
//   cube.scale.x +=0.001;
//   cube.scale.y +=0.001;
  // cube.material.wireframe = false
  torus.material.wireframe = true
  torus.material.flatShading = true
  torus.material.transparent = true
  torus.material.opacity = 0.5
  dode.material.wireframe = true
  // controls.update();
  // Render the scene
  renderer.render(scene, camera);
};

render();