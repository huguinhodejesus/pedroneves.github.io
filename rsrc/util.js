/*
	Conjunto de funcoes auxiliares
*/

/*
	Recebe um objeto e retorna um clone desse objeto

	Params:
		- obj: Objeto qualquer

	Returns:
		- Objeto
*/
function clone(obj){ 
	return JSON.parse(JSON.stringify(obj));
}
