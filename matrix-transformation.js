class MatrixTransformation {

    makeMatrix(sizeX, sizeY) {
        let i = 0;
        let my = [];
        for (let y = 0; y < sizeY; y++) {
            let mx = [];
            for (let x = 0; x < sizeX; x++) {
                i++;
                mx[x] = i;

            }
            my.push(mx);
        }
        return my;
    }

    getDimensions(m) {
        return { width: m[0].length, height: m.length };
    }

    valuesToString(m) {
        const len = num => num.toString().length;
        const biggestLength = len(this.getBiggestNumber(m));
        const numberOfZeroesNeeded = number => biggestLength - len(number);
        const toStringPadWithZeroes = number => {
            let str = number.toString();
            for (let i = 0; i < numberOfZeroesNeeded(number); i++) {
                str = '0' + str;
            }
            return str;
        };

        const mat = this.clone(m);
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                mat[y][x] = toStringPadWithZeroes(m[y][x]);
            }
        }
        return mat;
    }

    getBiggestNumber(m) {
        let gt = Number.MIN_VALUE;
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                if (m[y][x] > gt) {
                    gt = m[y][x];
                }
            }
        }
        return gt;
    }

    mirror(m) {
        m = this.flipY(this.flipX(m));
        return m;
    }

    flipY(m) {
        let width = m[0].length;
        let height = m.length;
        let lastY = height - 1;
        let yLevels = Math.floor(height / 2);
        var mat = this.clone(m);
        for (let ylevel = 0; ylevel < yLevels; ylevel++) {
            for (let x = 0; x < width; x++) {
                let top = m[ylevel][x];
                let bottom = m[lastY - ylevel][x];
                mat[ylevel][x] = bottom;
                mat[lastY - ylevel][x] = top;
            }
        }
        return mat;
    }

    flipX(m) {
        const width = m[0].length;
        const lastX = width - 1;
        const xLevels = Math.floor(width / 2);
        const mat = this.clone(m);
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < xLevels; x++) {
                let left = m[y][x];
                let right = m[y][lastX - x];
                mat[y][lastX - x] = left;
                mat[y][x] = right;
            }
        }
        return mat;
    }

    transpose(m) {
        const dimentions = this.getDimensions(m);
        const result = this.createEmpty(dimentions.height, dimentions.width);
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                result[x][y] = m[y][x];
            }
        }
        return result;
    }

    scale(m, scaler) {
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                m[y][x] = m[y][x] * scaler;
            }
        }
        return m;
    }

    multiply(matrixA, matrixB) {
        const a = matrixA, b = matrixB;
        const dimA = this.getDimensions(matrixA);
        const dimB = this.getDimensions(matrixB);
        let width, height;
        if(dimA.width > dimB.width){
            width = Math.min(dimA.width, dimB.width);
            height = Math.min(dimA.height, dimB.height);
        }
        else{
            width = Math.max(dimA.width, dimB.width);
            height = Math.max(dimA.height, dimB.height);
        }
        
        const result = this.createEmpty(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                result[y][x] = 0;
                for (let k = 0; k < dimA.width; k++) {
                    result[y][x] = result[y][x] + a[y][k] * b[k][x];
                }
            }
        }
        return result;
    }

    add(matrixA, matrixB) {
        const a = matrixA, b = matrixB;
        const dimA = this.getDimensions(a);
        const result = this.createEmpty(dimA.width, dimA.height);
        if (!this.areOfSameSize(a, b)) {
            throw new Error("ArgumentError: matrixA and matrixB needs to be of the same size");
        }
        for (let y = 0; y < dimA.height; y++) {
            for (let x = 0; x < dimA.width; x++) {
                result[y][x] = a[y][x] + b[y][x];
            }
        }
        return result;
    }

    subtract(matrixA, matrixB) {
        const a = matrixA, b = matrixB;
        const dimA = this.getDimensions(a);
        const result = this.createEmpty(dimA.width, dimA.height);
        if (!this.areOfSameSize(a, b)) {
            throw new Error("ArgumentError: matrixA and matrixB needs to be of the same size");
        }
        for (let y = 0; y < dimA.height; y++) {
            for (let x = 0; x < dimA.width; x++) {
                result[y][x] = a[y][x] - b[y][x];
            }
        }
        return result;
    }

    createEmpty(width, height) {
        const m = Array(height);
        for (let i = 0; i < m.length; i++) {
            m[i] = Array(width);
        }
        return m;
    }

    clone(m) {
        return JSON.parse(JSON.stringify(m));
    }

    areOfSameSize(matrixA, matrixB) {
        let a = this.getDimensions(matrixA);
        let b = this.getDimensions(matrixB);
        return b.height === a.height && b.width === a.width;
    }

    equal(matrixA, matrixB) {
        if (!this.areOfSameSize(matrixA, matrixB))
            return false;
        const mA = matrixA;
        const mB = matrixB;
        for (let y = 0; y < mA.length; y++) {
            for (let x = 0; x < mA[y].length; x++) {
                if (mA[y][x] !== mB[y][x])
                    return false;
            }
        }
        return true;
    }
    setEach(matrix, setter) {
        const m = matrix;
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                m[y][x] = setter(x, y, m);
            }
        }
    }
}