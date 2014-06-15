/*
	Retorna a funcao de interpolacao entre dois pontos

	Params:
		- point1: Objeto que possui dois atributos, x e y, que representam as coordenadas do ponto
		- point2: Objeto que possui dois atributos, x e y, que representam as coordenadas do ponto

	Returns:
		- function: funcao que possui um parametro que é um escalar entre 0 e 1. Essa função retorna
					um objeto tipo ponto que está na linha entre point1 e point2. 
*/

function interpolate(point1, point2){
	return function(t){
		var p1 = {
			x: ((1-t) * point1.x),
			y: ((1-t) * point1.y)
		};

		var p2 = {
			x: (t * point2.x),
			y: (t * point2.y)
		};

		var res = {
			x: p1.x + p2.x,
			y: p1.y + p2.y
		}

		return res;
	}
}

/*
	Retorna a funcao de interpolacao entre dois pontos

	Params:
		- point1: 	Funcao que representa um ponto recebe um parametro, entre 0 e 1, e retorna um ponto, com atributos
					x e y, que representam suas coordenadas
		- point2: 	Funcao que representa um ponto recebe um parametro, entre 0 e 1, e retorna um ponto, com atributos
					x e y, que representam suas coordenadas

	Returns:
		- function: funcao que possui um parametro que é um escalar entre 0 e 1. Essa função retorna
					um objeto tipo ponto que está na linha entre point1 e point2. 
*/

function interpolatefn(point1, point2){
	return function(t){
		var p1 = {
			x: ((1-t) * ((point1)(t)).x),
			y: ((1-t) * ((point1)(t)).y)
		};

		var p2 = {
			x: (t * ((point2)(t)).x),
			y: (t * ((point2)(t)).y)
		};

		var res = {
			x: p1.x + p2.x,
			y: p1.y + p2.y
		}

		return res;
	}
}