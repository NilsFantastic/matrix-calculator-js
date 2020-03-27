class Main {
	constructor() {
		const mat = new MatrixTransformation();
		let matrix = mat.makeMatrix(10, 10);
		Echo.write(mat.valuesToString(matrix));
		Echo.write(mat.valuesToString(mat.mirror(matrix)));
	}
}
new Main();


