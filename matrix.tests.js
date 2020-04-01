proof("MatrixTransformations can compare matrices' equality", () => {
    const matrixTransform = new MatrixTransformation();
    fact("equal_matricesOfSameValues_areTheSame", () => {
        let matrixA = [
            [1, 3, 7],
            [5, 2, 9]
        ];
        let matrixB = [
            [1, 3, 7],
            [5, 2, 9]
        ];
        let areEqual = matrixTransform.equal(matrixA, matrixB);

        assertTrue(areEqual)
    });
});
proof("MatrixTransformations can transpose", () => {
    const matrixTransform = new MatrixTransformation();
    fact("transpose_rectangularWide_swichesRowsAndColumns", () => {
        let initial = [
            [1, 3, 7],
            [5, 2, 9]
        ];
        let expected = [
            [1, 5],
            [3, 2],
            [7, 9],
        ];
        let transposed = matrixTransform.transpose(initial);
        assertTrue(matrixTransform.equal(transposed, expected));
    });

    fact("transpose_rectangularHigh_swichesRowsAndColumns", () => {
        let initial = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        let expected = [
            [1, 3, 5],
            [2, 4, 6]
        ];
        let transposed = matrixTransform.transpose(initial);
        assertTrue(matrixTransform.equal(transposed, expected));
    });
});

proof("MatrixTransformations can scale matrices", () => {
    const matrixTransform = new MatrixTransformation();
    fact("scale_always_scaleAllValues", () => {
        let matrix = [
            [1, 2]
        ];
        let scaled = matrixTransform.scale(matrix, 2);
        assertTrue(
            scaled[0][0] == 2 && scaled[0][1] == 4
        );
    });
});

proof("MatrixTransformations can multiply matrices", () => {
    const matrixTransform = new MatrixTransformation();

    fact("multiply_2x3A3x2B_shouldGet3x3result", () => {
        let a = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        let b = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        let expected = [
            [9, 12, 15],
            [19, 26, 33],
            [29, 40, 51]
        ];
        let product = matrixTransform.multiply(a, b);
        assertTrue(matrixTransform.equal(product, expected));
    });

    fact("multiply_3x2A2x3B_shouldGet2x2result", () => {
        let b = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        let a = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        let expected = [
            [22, 28],
            [49, 64]
        ];
        let product = matrixTransform.multiply(a, b);
        assertTrue(matrixTransform.equal(product, expected));
    });
});

proof("MatrixTransformations can subtract matrices", () => {
    const matrixTransform = new MatrixTransformation();

    fact("subtract_always_subtractAllNumbers", () => {
        let a = [
            [1, 2],
            [3, 4],
        ];
        let b = [
            [0, 1],
            [2, 2],
        ];
        let expected = [
            [1, 1],
            [1, 2],
        ];
        let sum = matrixTransform.subtract(a, b);
        assertTrue(matrixTransform.equal(sum, expected));
    });
});

proof("MatrixTransformations can flip matrices", () => {
    const matrixTransform = new MatrixTransformation();

    fact("flipX_xRectangularWide_invertTheMatrixXAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        let flipped = matrixTransform.flipX(matrix);
        assertTrue(flipped[0][0] == 3 && flipped[1][0] == 6);
    });

    fact("flipX_yRectangularHigh_invertTheMatrixXAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
        ];
        let flipped = matrixTransform.flipX(matrix);
        assertTrue(flipped[0][0] == 3 && flipped[3][0] == 12);
    });

    fact("flipX_square_invertTheMatrixXAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        let flipped = matrixTransform.flipX(matrix);
        assertTrue(flipped[0][0] == 3 && flipped[2][0] == 9);
    });

    fact("flipY_xRectangularWide_invertTheMatrixYAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        let flipped = matrixTransform.flipY(matrix);
        assertTrue(flipped[0][0] == 4 && flipped[0][2] == 6);
    });

    fact("flipY_yRectangularHigh_invertTheMatrixYAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
        ];
        let flipped = matrixTransform.flipY(matrix);
        assertTrue(flipped[0][0] == 10 && flipped[0][2] == 12);
    });

    fact("flipY_square_invertTheMatrixYAxis", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        let flipped = matrixTransform.flipY(matrix);
        assertTrue(flipped[0][0] == 7 && flipped[0][2] == 9);
    });

    fact("mirror_square_bothAxes", () => {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        let flipped = matrixTransform.mirror(matrix);
        assertTrue(
            flipped[0][0] == 9 &&
            flipped[2][2] == 1 &&
            flipped[0][2] == 7 &&
            flipped[2][0] == 3
        );
    });

});


