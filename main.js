// javascript |||
// Specify all features we check for here, this way we get a nice overview and by using this object there is lesser risk of misspelling these in certain places.
const features = {
  querySelector: "querySelector",
  querySelectorAll: "querySelectorAll",
}

// Make sure certain functions are supported by the visitors browser
function validateFunctions(...functionNames) {
  // Variable used to gather functions that turns out to be unsupported
  let unsupportedFunctions = null;

  // Loop over all provided function names
  functionNames.forEach(functionName => {
    // Check if provided function name is supported
    if (typeof (document[functionName]) !== "function") {
      // Add unsupported functions to the end of the unsupportedFunctions variable
      unsupportedFunctions += functionName;
    }
  });

  // Check if any of the provided functions were unsupported
  if (unsupportedFunctions !== null) {
    // Indicate that we have found one or more unsupported functions
    throw unsupportedFunctions;
  }
}

function enableFeatureIfPossible(featureName, featureFunction) {
  // Try to run the code inside the try block. if an error occurs or is thrown then run the code in the catch block
  try {
    // Run the imagePopUp function
    featureFunction();
  } catch (err) {
    // Log the error to the console, so if a user is unable to use this feature you can tell them to look in the console to see why it isn't working for them.
    console.log(featureName + " is disabled because: " + err);
  }
}

// Whenever a project image is clicked on a full screen preview should be displayed
function themeSwitcher() {
  // Make sure that the visitors browser supports these functions
  validateFunctions(
    features.querySelector,
    features.querySelectorAll
  );

  const headerTag = document.querySelector("header");

  const imageTag = document.createElement("button");
  imageTag.textContent = "Light theme";
  imageTag.setAttribute("id", "theme-toggle");
  imageTag.setAttribute("class", "theme-toggle");

  imageTag.addEventListener("click", imageTag => {
    const htmlTag = document.querySelector('html');

    const currentTheme = htmlTag.dataset.theme;

    const themeToggleButton = document.querySelector("#theme-toggle");

    if (currentTheme === "dark") {
      htmlTag.dataset.theme = "light";
      themeToggleButton.textContent = "Dark theme";
    } else {
      htmlTag.dataset.theme = "dark";
      themeToggleButton.textContent = "Light theme";
    }
  });

  headerTag.appendChild(imageTag);
}

// Whenever a project image is clicked on a full screen preview should be displayed
function imagePopUp() {
  // Make sure that the visitors browser supports these functions
  validateFunctions(
    features.querySelector,
    features.querySelectorAll
  );

  // Select all projects nodes
  const projects = document.querySelector(".section--projects");

  // Validate that project nodes were found
  if (typeof (document[projects]) !== "Element") {
    // No projects were found so no need to continue running this function
    return;
  }

  const projectImages = projects.querySelectorAll("img");

  // Validate that images exist within projects
  if (typeof (document[projects]) !== "NodeList") {
    // No images were found within projects so no need to continue running this function
    return;
  }

  // Perform all actions inside this forEach for all images
  projectImages.forEach(image => {
    // Change the mouse cursor when hovering these images
    image.style.cursor = "zoom-in";

    // Run the code inside this event listener whenever a project image is clicked
    image.addEventListener("click", image => {
      // Create a div tag
      const divTag = document.createElement("div");
      // Add a class to the div tag
      divTag.classList.add("container--image-pop-up");
      // Set the cursor that is shown when the user hovers over the div
      divTag.style.cursor = "zoom-out";

      // Run the code inside this event listener whenever the popped up div is clicked
      divTag.addEventListener("click", _ => {
        // Select the container that har popped up
        const popUpContainer = document.querySelector(".container--image-pop-up");
        // Remove the entire pop up div and the image inside it
        popUpContainer.remove();
      });

      // Create an image tag
      const imageTag = document.createElement("img");
      // Set the src for the new image to the same as the one the user clicked
      imageTag.src = image.target.src;

      // Put the newly created image inside the div
      divTag.appendChild(imageTag);

      // Select the body tag
      const bodyTag = document.querySelector("body");
      // Put the newly created pop up div in side the body (it will be rendered at the end)
      bodyTag.appendChild(divTag);
    });
  });
}

// Reveal elements smoothly as the user scrolls them into view
function scrollReveal() {
  // Make sure that the visitors browser supports these functions
  validateFunctions(
    features.querySelector,
    features.querySelectorAll
  );
  const elementsArray = document.querySelectorAll(".component--project-card");
  elementsArray.forEach(element => {
    element.classList.add("hidden");
  });

  window.addEventListener('scroll', fadeIn => {
    let elementsArray = document.querySelectorAll(".component--project-card");

    for (var i = 0; i < elementsArray.length; i++) {
      var elem = elementsArray[i]
      var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        elem.classList.remove("hidden");
      } else {
        elem.classList.add("hidden");
      }
    }
  });
}

enableFeatureIfPossible("Theme switcher", themeSwitcher);
enableFeatureIfPossible("Image pop up", imagePopUp);
enableFeatureIfPossible("Scroll reveal", scrollReveal);