
class Echo {
    static use(obj) {
        this.ifType = (type, action) => {
            const isIndexed = o => o && typeof o === 'object' && o.constructor === Array;
            const is2dIndexed = o => o.length > 1 && isIndexed(o[0]);
            const isArray = o => type === 'array' && isIndexed(obj) && !is2dIndexed(o);
            const isMatrix = o => type === 'matrix' && isIndexed(o) && is2dIndexed(o);
            const isObject = o => type === 'object' && !!(o && typeof o === 'object' && o.constructor === Object);
            const shouldActionForUnknown = o => typeof o === type && type !== 'object';
            if (isMatrix(obj)) {
                action(obj);
            }
            else if (isArray(obj) && !isMatrix(obj)) {
                action(obj);
            }

            else if (isObject(obj)) {
                action(obj);
            }
            else if (shouldActionForUnknown(obj)) {
                action(obj);
            }
            return this;
        };
        return this;
    }
    static write(...messages) {
        messages.forEach((msg, i) => {
            Echo.use(msg)
                .ifType('string', this.print)
                .ifType('array', this.printArray)
                .ifType('matrix', this.printMatrix)
                .ifType('object', this.printJson)
                ;
            if (messages.length > 1 && i < messages.length - 1) {
                Echo.print(", ");
            }
        });
        Echo.printLn();
    }
    static print(str) {
        document.write(str);
    }
    static printLn(str) {
        str = str || '';
        Echo.print(str + "<br>\n");
    }
    static printArray(array) {
        let str = "[";
        array.forEach((x, i) => {
            str += x;
            if (i < array.length - 1) {
                str += ", ";
            }
        });
        Echo.printLn(str + "]");

    }
    static printJson(m) {
        let a = JSON.stringify(m, null, 4);
        Echo.print(a);
    }
    static printMatrix(m) {
        let a = JSON.parse(JSON.stringify(m));
        a.forEach(y => {
            Echo.printArray(y);
        });
    }
}