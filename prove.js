const approvedSymbol = '\u2705';
const failureSymbol = '\u274C';
const ignoredSymbol = '\u26A0';
const successStyle = 'color: green';
const ignoredStyle = 'color: orange';
const failureStyle = 'color: red';
const proofs = [];
const logger = console;
const proofPrintLevel = {
    basic: "BASIC",
    detail: "DETAIL"
}
const successPrintLevel = proofPrintLevel.basic;
const failurePrintLevel = proofPrintLevel.detail;
const ignoredPrintLevel = proofPrintLevel.detail;
function proof(proofName, proofRunner) {
    proofBoxing = function () {
        const facts = [];

        this.fact = (name, factTester) => {
            facts.push(factFactory(name, factTester));
        };
        this.ignore = (name) => {
            facts.push(() => [{ factName: name, ignored: true }]) 
        };
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
        try {
            factTester();
        }
        catch(e){
            asserts.push({ factName: name, success: false, message: "got exception: " + e.message });
        }
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
    return {failures:failures, successes: successes, ignored: ignored};
}
function printFailure(proofName, asserts) {
    this.print(proofName, asserts, failureSymbol, failureStyle, failurePrintLevel, logger.error)
}
function printIgnored(proofName, asserts) {
    this.print(proofName, asserts, ignoredSymbol, ignoredStyle, ignoredPrintLevel, logger.log);
}

function printSuccesses(proofName, asserts) {
    this.print(proofName, asserts, approvedSymbol, successStyle, successPrintLevel, logger.info);
}
function print(proofName, asserts, symbol, style, printLevel, printFunction) {
    let message;
    if (printLevel === proofPrintLevel.detail) {
        message = getDetailLevelPrintMessage(proofName, asserts, symbol);
    }
    else {
        message = getBasicLevelPrintMessage(proofName, asserts, symbol);
    }

    printFunction("%c" + message, style);
}
function getBasicLevelPrintMessage(proofName, asserts, symbol) {
    return symbol + ` (${asserts.length}) ` + proofName;
}
function getDetailLevelPrintMessage(proofName, asserts, symbol) {
    let message = proofName + "\n";
    for (let i = 0; i < asserts.length; i++) {
        const assert = asserts[i];
        message += "\t" + symbol + "\u00A0" + assert.factName + "\n";
        if(assert.message){
            message += "\t\t" + assert.message + "\n";
        }
    }
    return message;
}

function printTestSummary(results){
    logger.log("\n\n");
    const singular = 'fact is';
    const plural = 'facts are';
    if(results.failures.length > 0){
        logger.error(`%c ${results.failures.length} ${results.failures.length > 1 ? plural : singular} incorrect`, failureStyle);
    }
    else if(results.successes.length > 0){
        logger.info(`%c ${results.successes.length} ${results.successes.length > 1 ? plural : singular} proven`, successStyle);
    }
    if(results.ignored.length > 0){
        logger.warn(`%c ${results.ignored.length} ${results.ignored.length > 1 ? plural : singular} being ignored `, ignoredStyle);
    }
}

function runAllProofs() {
    const results = {failures:[], successes: [], ignored: []}
    for (let i = 0; i < proofs.length; i++) {
        let proof = proofs[i];
        const result = runProof(proof);
        results.failures = results.failures.concat(result.failures);
        results.successes = results.successes.concat(result.successes);
        results.ignored = results.ignored.concat(result.ignored);
    }
    printTestSummary(results);
}
window.addEventListener("load", () => {
    setTimeout(() => runAllProofs(), 50)
});