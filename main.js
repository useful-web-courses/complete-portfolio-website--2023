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

function enableFeatureIfSupported(featureName, featureFunction) {
    try {
        featureFunction();
    } catch {
        console.log(featureName + " is disabled because " + err);
    }
}

function imagePopUp() {
    validateFunctions(features.querySelector, features.querySelectorAll);

    const projects = document.querySelector(".section--projects");

    if (projects === null) {
        return;
    }
    
    const projectImages = projects.querySelectorAll("img");

    if (projectImages === null) {
        return;
    }

    projectImages.forEach(image => {
        image.style.cursor = "zoom-in";

        image.addEventListener("click", image => {
            const divTag = document.createElement("div");
            divTag.classList.add("container--image-pop-up");
            divTag.style.cursor = "zoom-out";

            divTag.addEventListener("click", _ => {
                const popUpContainer = document.querySelector(".container--image-pop-up");
                popUpContainer.remove();
            })

            const imageTag = document.createElement("img");
            imageTag.src = image.target.src.replace("--thumbnail", "");

            divTag.appendChild(imageTag);

            const bodyTag = document.querySelector("body");
            bodyTag.appendChild(divTag);
            
        });
    });
}

enableFeatureIfSupported("image pop up", imagePopUp);
