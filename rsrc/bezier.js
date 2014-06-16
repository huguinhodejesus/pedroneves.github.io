function createBezier() {
	
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
		setControlPoints: function(controlPoints){
			this.nivel[0] = controlPoints;
			if(this.nivel[0].length > 2){
				this.buildLevels();
			}
			this.numberLevels = (controlPoints.length - 1);
		},
		getForLevel: function(t, lvl){
			var self = this;
			var retorno = [];

			for (var i = 0; i < self.nivel[lvl].length; i++) {
				retorno.push((self.nivel[lvl][i])(t));
			};

			return retorno;
		},
		get: function(t){
			var self = this;
			var retorno = self.getForLevel(t, self.numberLevels);
			return retorno[0];
		},
		getPoints: function(){
			var list = [];

			for (var i = 0; i <= 1; i = i + 0.1) {
				list.push(this.get(i));
			};

			return list;
		}
	}

	return retorno;
}

