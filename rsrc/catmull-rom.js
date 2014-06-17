function createCatmullRom() {
	
	return {
		controlPoints: [],
		segments: [],
		numberSegments: 0,
		a: 0.5,
		setControlPoints: function(pts){
			if(pts.length >= 4){
				this.controlPoints = pts;
				this.numberSegments = (pts.length - 3);
				this.buildSegments();
			}else{
				this.controlPoints = [];
				this.segments = [];
				this.numberSegments = 0;
			}
		},
		secondBezier: function(p0, p1, p2){
			var self = this;

			var v0 = new THREE.Vector3(p0.x, p0.y, p0.z);
			var v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
			var v2 = new THREE.Vector3(p2.x, p2.y, p2.z);

			var d1 = Math.abs(v0.distanceTo(v1));
			var d2 = Math.abs(v1.distanceTo(v2));

			var d1a = Math.pow(d1, self.a);
			var d2a = Math.pow(d2, self.a);

			var d1aa = Math.pow(d1, (2*self.a));
			var d2aa = Math.pow(d2, (2*self.a));

			return {
				x: ((d1aa*p2.x) - (d2aa*p0.x) + (((2*d1aa) + (3*d1a*d2a) + d2aa)*p1.x)) / ((3*d1a) * (d1a + d2a)),
				y: ((d1aa*p2.y) - (d2aa*p0.y) + (((2*d1aa) + (3*d1a*d2a) + d2aa)*p1.y)) / ((3*d1a) * (d1a + d2a))
			}
		},
		thirdBezier: function(p1, p2, p3){
			var self = this;

			var v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
			var v2 = new THREE.Vector3(p2.x, p2.y, p2.z);
			var v3 = new THREE.Vector3(p3.x, p3.y, p3.z);

			var d2 = Math.abs(v1.distanceTo(v2));
			var d3 = Math.abs(v2.distanceTo(v3));

			var d2a = Math.pow(d2, self.a);
			var d3a = Math.pow(d3, self.a);

			var d2aa = Math.pow(d2, (2*self.a));
			var d3aa = Math.pow(d3, (2*self.a));

			return {
				x: ((d3aa*p1.x) - (d2aa*p3.x) + (((2*d3aa) + (3*d3a*d2a) + d2aa)*p2.x)) / ((3*d3a) * (d3a + d2a)),
				y: ((d3aa*p1.y) - (d2aa*p3.y) + (((2*d3aa) + (3*d3a*d2a) + d2aa)*p2.y)) / ((3*d3a) * (d3a + d2a))
			}
		},
		buildForSegmentPolinomial: function(segmentNumber){
			var self = this;
			
			var p0 = self.controlPoints[segmentNumber]
			var p1 = self.controlPoints[segmentNumber + 1];
			var p2 = self.controlPoints[segmentNumber + 2];
			var p3 = self.controlPoints[segmentNumber + 3];

			return function(t){
				return {
					x: (0.5 * (
						(2 * p1.x) + 
						( ((-1*p0.x) + p2.x) * t) + 
						( ((2*p0.x) - (5*p1.x) + (4*p2.x) - p3.x) * (t*t) ) + 
						( ((-1*p0.x) + (3*p1.x) - (3*p2.x) + p3.x) * (t*(t*t)) ) 
					)),
					y: (0.5 * (
						(2 * p1.y) + 
						( ((-1*p0.y) + p2.y) * t) + 
						( ((2*p0.y) - (5*p1.y) + (4*p2.y) - p3.y) * (t*t) ) + 
						( ((-1*p0.y) + (3*p1.y) - (3*p2.y) + p3.y) * (t*(t*t)) ) 
					))
				}
			};
		},
		buildForSegment: function(segmentNumber){
			var self = this;
			
			var p0 = self.controlPoints[segmentNumber]
			var p1 = self.controlPoints[segmentNumber + 1];
			var p2 = self.controlPoints[segmentNumber + 2];
			var p3 = self.controlPoints[segmentNumber + 3];

			var b0 = p1;
			var b1 = self.secondBezier(p0, p1, p2);
			var b2 = self.thirdBezier(p1, p2, p3);
			var b3 = p2;

			var bezier = createBezier();
			bezier.setControlPoints([b0, b1, b2, b3]);
			var fn = bezier.nivel[bezier.numberLevels][0];

			return function(t){
				return fn(t);
			};
		},
		buildSegments: function(){
			var self = this;

			self.segments = [];

			for (var i = 0; i < self.numberSegments; i++) {
				self.segments.push(self.buildForSegment(i));
			};
		},
		get: function(t){
			var self = this;
			var segmentsPoints = [];

			for (var i = 0; i < self.segments.length; i++) {
				segmentsPoints.push(self.segments[i](t));
			};

			return segmentsPoints;
		},
		getPoints: function(){
			var self = this;
			var segmentsPoints = [];

			for (var i = 0; i < self.numberSegments; i++) {
				segmentsPoints[i] = [];
			};

			var points = null;
			for (var i = 0; i < 1; i = i + 0.01) {
				points = self.get(i);

				for (var j = 0; j < points.length; j++) {
					segmentsPoints[j].push(points[j]);
				};	
			};

			var retorno = [];

			for (var i = 0; i < segmentsPoints.length; i++) {
				for (var j = 0; j < segmentsPoints[i].length; j++) {
					retorno.push(segmentsPoints[i][j]);
				};
			};

			return retorno;
		}
	}
}