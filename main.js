const features = {
    querySelector: "querySelector",
    querySelectorAll: "querySelectorAll"
}

function validateFunctions(...functionNames) {
    let unsupportedFunctions = null;

    functionNames.forEach(functionName => {
        if (typeof(document[functionName]) !== "function") {
            unsupportedFunctions += functionName;
        }
    });

    if (unsupportedFunctions !== null) {
        throw unsupportedFunctions;
    }
}