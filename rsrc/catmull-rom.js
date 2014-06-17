function createCatmullRom() {
	
	return {
		controlPoints: [],
		segments: [],
		numberSegments: 0,
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
		buildForSegment: function(segmentNumber){
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