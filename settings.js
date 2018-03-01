function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    colour: document.querySelector("#colour").value,
    fontSize: document.querySelector("#fontSize").value,
    height: document.querySelector("#height").value,
    width: document.querySelector("#width").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result.colour);
    console.log(result.fontSize);
    console.log(result.height);
    console.log(result.width);
    document.querySelector("#colour").value = result.colour || "yellow";
    document.querySelector("#fontSize").value = result.fontSize || "19";
    document.querySelector("#height").value = result.height || "300";
    document.querySelector("#width").value = result.width || "1000";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["colour","fontSize","height","width"]);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
