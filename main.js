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

function scrollReveal() {
    validateFunctions(features.querySelector, features.querySelectorAll);

    const elementsArray = document.querySelectorAll(".component--project-card");
    elementsArray.forEach(element => {
        element.classList.add("hidden");
    });

    window.addEventListener("scroll", fadeIn => {
        let elementsArray = document.querySelectorAll(".component--project-card");

        for (var i = 0; i < elementsArray.length; i++) {
            var elem = elementsArray[i];

            let distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
            if (distInView < 0) {
                elem.classList.remove("hidden");
            } else {
                elem.classList.add("hidden");
            }
        }
    })
    
}

function themeSwitcher() {
    validateFunctions("querySelector", "querySelectorAll");

    const headerTag = document.querySelector("header");

    const imageTag = document.createElement("button");
    imageTag.textContent = "Light theme";
    imageTag.setAttribute("id", "theme-toggle");
    imageTag.setAttribute("class", "theme-toggle");

    imageTag.addEventListener("click", imageTag => {
       const htmlTag = document.querySelector("html");

        const currentTheme = htmlTag.dataSet.theme;

        if (currentTheme === "dark") {
            htmlTag.dataSet.theme = "light";
            themeToggleButton.textContent = "Dark theme";
        } else {
            htmlTag.dataSet.theme = "dark";
            themeToggleButton.textContent = "Light theme";
        }
    });

    headerTag.appendChild(imageTag);
}

enableFeatureIfSupported("image pop up", imagePopUp);
enableFeatureIfSupported("scroll reveal", scrollReveal);
enableFeatureIfSupported("Theme switcher", themeSwitcher);
