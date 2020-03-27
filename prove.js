const approvedSymbol = '\u2705';
const failureSymbol = '\u274C';
const proofs = [];
const logger = console;
const proofPrintLevel = {
    basic: "BASIC",
    detail: "DETAIL"
}
const successPrintLevel = proofPrintLevel.basic;
const failurePrintLevel = proofPrintLevel.detail;
function proof(proofName, proofRunner) {
    proofBoxing = function () {
        const facts = [];

        this.fact = (name, factTester) => {
            facts.push(factFactory(name, factTester));
        };
        this.xfact = (name) => { /*console.log("xfact", name); */ return () => [{ name: name, ignored: true }] };
        proofRunner();
        return { proofName: proofName, facts: facts }
    };
    proofs.push(proofBoxing);
}

function factFactory(name, factTester) {
    factBoxing = function () {
        const asserts = [];
        this.assertTrue = expression => {
            if (!expression) {
                asserts.push({ factName: name, success: false, message: "expected true got false" });
            }
            else {
                asserts.push({ factName: name, success: true });
            }
        };
        factTester();
        return asserts;
    }
    return factBoxing;
}

function runProof(proofBoxing) {
    const wrapper = proofBoxing();
    var failures = [];
    var successes = [];
    var ignored = [];

    for (let i = 0; i < wrapper.facts.length; i++) {
        const fact = wrapper.facts[i];
        const asserts = fact();
        for (let j = 0; j < asserts.length; j++) {
            const assert = asserts[j];
            if (assert.success) {
                successes.push(assert);
            }
            else if (assert.ignored) {
                ignored.push(assert);
            }
            else {
                failures.push(assert);
            }
        }
    }
    if (failures.length > 0) {
        printFailure(wrapper.proofName, failures);
    }
    else {
        if (ignored.length) {
            printIgnored(wrapper.proofName, ignored);
        }
        printSuccesses(wrapper.proofName, successes);
    }
}
function printFailure(proofName, asserts) {
    this.print(proofName, asserts, failureSymbol, "red", failurePrintLevel, logger.error)
}
function printIgnored(proofName, asserts) {
    this.print(proofName, asserts, "-", "orange", successPrintLevel, logger.log);
}

function printSuccesses(proofName, asserts) {
    this.print(proofName, asserts, approvedSymbol, "green", successPrintLevel, logger.info);
}
function print(proofName, asserts, symbol, color, printLevel, printFunction) {
    let message;
    if (printLevel === proofPrintLevel.detail) {
        message = getDetailLevelPrintMessage(proofName, asserts, symbol);
    }
    else {
        message = getBasicLevelPrintMessage(proofName, asserts, symbol);
    }

    printFunction("%c" + message, "color:" + color);
}
function getBasicLevelPrintMessage(proofName, asserts, symbol) {
    return symbol + ` (${asserts.length}) ` + proofName;
}
function getDetailLevelPrintMessage(proofName, asserts, symbol) {
    let message = proofName + "\n";
    for (let i = 0; i < asserts.length; i++) {
        const assert = asserts[i];
        message += "\t" + symbol + " " + assert.factName + "\n";
    }
    return message;
}
function runAllProofs() {
    for (let i = 0; i < proofs.length; i++) {
        let proof = proofs[i];
        runProof(proof);
    }
}
window.addEventListener("load", () => {
    setTimeout(() => runAllProofs(), 50)
});