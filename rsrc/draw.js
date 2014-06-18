var env = {
	scene: null,
	renderer : null,
	camera: null,
	width: 800,
	height: 600,
	cursor: null,
	points: {
		clicked: {
			set: [],
		},
		curvas: [
			{
				nome: 'poligonal',
				set: [],
				color: 0x0000ff,
				geometry: null,
				material: null,
				line: null,
				refresh: function(){
					self = this;

					var geo = null;
					var mat = null;
					var sphere = null;
					self.line = [];

					for (var i = 0; i < self.set.length; i++) {
						geo = new THREE.SphereGeometry(3, 8, 8);

						mat = new THREE.MeshBasicMaterial({
							color: self.color,
						});

						sphere = new THREE.Mesh(geo, mat);
						sphere.position = self.set[i];
						self.line.push(sphere);
					};
					
				}
			}
		],
	},
	setPointsToCurve: function(curveName, pts){
		var self = this;
		var vectorList = [];
		var z = 0;

		for (var i = 0; i < pts.length; i++) {
			vectorList.push(new THREE.Vector3(pts[i].x, pts[i].y, z));
		};

		for (var i = 0; i < self.points.curvas.length; i++) {
			if(self.points.curvas[i].nome == curveName){
				self.points.curvas[i].set = vectorList;
				i = self.points.curvas.length;
			}
		};
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
				
				self.geometry = new THREE.Geometry();
				self.geometry.vertices = self.set;

				self.material = new THREE.LineBasicMaterial({
					color: self.color
				});

				self.line = new THREE.Line(self.geometry, self.material);
			}
		}

		self.points.curvas.push(newCurve);
	},
	addControlPoint: function(x, y){
		var self = this;

		var pos = {
			x: x,
			y: y
		}
		
		self.points.clicked.set.push(pos);
		self.addPointToCurve('poligonal', pos);
	},
	removeControlPoint: function(x, y){
		var self = this;
		
		var pointOnList = new THREE.Vector3(0,0,0);

		for (var i = 0; i < self.points.clicked.set.length; i++) {
			pointOnList.x = self.points.clicked.set[i].x;
			pointOnList.y = self.points.clicked.set[i].y;

			if((self.cursor.distanceTo(pointOnList)) <= 3){
				self.points.clicked.set.splice(i, 1);
			}
		};
	},
	init: function(wid, hei, element){
		var self = this;

		self.cursor = new THREE.Vector3(0,0,0);

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
		self.camera = new THREE.OrthographicCamera( self.width / - 2, self.width / 2, self.height / 2, self.height / - 2, 1, 500 );
		self.camera.position.set(0, 0, 20);
		self.camera.lookAt(new THREE.Vector3(0, 0, 0));
	},
	update: function(){
		var self = this;

		self.scene = new THREE.Scene();

		for (var i = 0; i < self.points.curvas.length; i++) {
			self.points.curvas[i].refresh();

			if(self.points.curvas[i].nome == 'poligonal'){
				for (var j = 0; j < self.points.curvas[i].line.length; j++) {
					self.scene.add(self.points.curvas[i].line[j]);
				};
			}else{
				self.scene.add(self.points.curvas[i].line);
			}
		};
		
		self.renderer.render(self.scene, self.camera);
	}
}
