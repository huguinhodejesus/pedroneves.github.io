function createBezier(pts) {
	
	var retorno = {
		nivel: [],
		numberLevels: 0,
		buildForLevel: function(lvl){
			var self = this;
			var levelPoints = [];

			for (var i = 0; i < (self.nivel[(lvl - 1)].length - 1); i++) {
				if((lvl - 1) > 0){
					levelPoints.push(
						interpolatefn(
							self.nivel[(lvl - 1)][i],
							self.nivel[(lvl - 1)][(i + 1)]
						)
					);
				}else if((lvl - 1) == 0){
					levelPoints.push(
						interpolate(
							self.nivel[(lvl - 1)][i],
							self.nivel[(lvl - 1)][(i + 1)]
						)
					);
				}
			}

			return levelPoints;
		},
		buildLevels: function(){
			var self = this;
			var isLastLevel = false;
			var currentLevel = 1;
			var level = null;

			while(!isLastLevel){
				level = self.buildForLevel(currentLevel);
				self.nivel[currentLevel] = level;

				if(self.nivel[currentLevel].length == 1){
					isLastLevel = true;
				}

				currentLevel++;
			}
		},
		init: function(controlPoints){
			this.nivel[0] = controlPoints;
			buildLevels();
			this.numberLevels = (controlPoints.length - 1);
		},
		getForLevel: function(t, lvl){
			var self = this;
			var retorno = [];

			for (var i = 0; i < self.nivel[lvl].length; i++) {
				retorno.push((self.nivel[lvl][i])(t));
			};
		},
		get: function(t){
			var self = this;
			var retorno = getForLevel(t, (self.numberLevels - 1))
			return retorno[0];
		}
	}

	retorno.init(pts);

	return retorno;
}

