var env = {
	scene: null,
	renderer : null,
	camera: null,
	width: 800,
	height: 600,
	points: {
		clicked: {
			set: [],
		},
		curvas: [
			{
				nome: 'poligonal',
				set: [],
				color: 0x0000ff,
				geometry: new THREE.Geometry(),
				material: new THREE.LineBasicMaterial(),
				line: null,
				refresh: function(){
					self = this;

					self.geometry.vertices = self.set;
					self.material = new THREE.LineBasicMaterial({
						color: self.color
					});

					line = new THREE.Line(self.geometry, self.material);
				}
			}
		],
	},
	addPointToCurve: function(curveName, point){
		var self = this;
		var vector = new THREE.Vector3(point.x, point.y, 0);

		for (var i = 0; i < self.points.curvas.length; i++) {
			if(self.points.curvas[i].nome == curveName){
				self.points.curvas[i].set.push(vector);
				i = self.points.curvas.length;
			}
		};
	},
	addCurve: function(curveName, color){
		var self = this;

		var newCurve = {
			nome: curveName,
			set: [],
			color: color,
			geometry: new THREE.Geometry(),
			material: new THREE.LineBasicMaterial(),
			line: null,
			refresh: function(){
				self = this;

				self.geometry.vertices = self.set;
				self.material = new THREE.LineBasicMaterial({
					color: self.color
				});

				line = new THREE.Line(self.geometry, self.material);
			}
		}

		self.points.curvas.push(newCurve);
	},
	init: function(wid, hei, element){
		var self = this;

		self.scene = new THREE.Scene();
		self.renderer = new THREE.WebGLRenderer();

		if(wid && hei){
			self.width = wid;
			self.height = hei;
		}else{
			self.width = 800;
			self.height = 600;
		}

		self.renderer.setSize(self.width, self.height);
		element.append(self.renderer.domElement);
		self.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 500 );
		// camera.position.set(0, 0, 2);
		self.camera.lookAt(new THREE.Vector3(0, 0, 0));
	},
	addControlPoint: function(x, y){
		var self = this;

		var pos = {
			x: x,
			y: y
		}

		self.points.clicked.push(pos);
		self.addPointToCurve('poligonal', pos);
	},
	update: function(){
		var self = this;

		self.scene = new THREE.Scene();

		for (var i = 0; i < self.curvas.length; i++) {
			self.curvas[i].refresh();
			self.scene.add(self.curvas[i].line);
		};
		
		self.renderer.render(self.scene, self.camera);
	}
}