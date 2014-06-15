var env = {
	scene: null,
	renderer : null,
	camera: null,
	width: 800,
	height: 600,
	pointSets: {
		clicked: null,
		controlPoints null,
		curvas: null,
	},
	init: function(){
		
	}
}

// ================================= INIT =================================
var c = $("#c");
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
var width = 800;
var height = 600;
renderer.setSize( width, height );
c.append(renderer.domElement);

var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 500 );
// camera.position.set(0, 0, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// global para armazenar a listagem, ORDENADA, de vetores que compoem a linhe e o sistema de pontos.
var pointsList = [];
var lineVerticesList = [];

// identifica qual funcao deve ser executada.
// init com lines
var selectedFunction = "line";


// ================================= FUNCTIONS =================================

function update(){
	/*
		Cria uma nova cena, atualizada com os novos vetores da linha e dos pontos.

		ToDo:
			- Sistema de pontos (THREE.Particles)
			- Multiplas linhas
	*/

	scene = new THREE.Scene();

	geometry = new THREE.Geometry();
	geometry.vertices = clone(lineVerticesList);

	var material;

	switch(selectedFunction){
		case 'point':
			material = new THREE.ParticleSystemMaterial();
			break;
		case 'line':
			material = new THREE.LineBasicMaterial({
				color: 0x00ff00,
			});
			break;
		default:
			break;
	}

	line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer.render(scene, camera);
}

// LINES ==================================================================

function addVertexToLine(x, y){
	lineVerticesList.push(new THREE.Vector3(x, y, 0));
}

// POINTS ==================================================================

function addPoint(x, y){
	pointsList.push(new THREE.Vector3(x, y, 0));
}