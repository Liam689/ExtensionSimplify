
function addOverlay(){
  window.overlay = document.createElement("div");
  console.log("Overlay Added");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.opacity = "0.7";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.height = "100%";
  overlay.style.width = "100%";
  overlay.style.zIndex = "999";
  overlay.style.display = "block";
  overlay.style.backgroundColor = "grey";
  window.bodyTag = document.getElementsByTagName('body');
  bodyTag[0].insertBefore(overlay, bodyTag[0].firstChild);
}

function addWrapper(){
  window.wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  wrapper.style.zIndex = "1000";
  var marginPixels = window.innerWidth * (15/100);
  wrapper.style.paddingRight = "4px";
  wrapper.style.marginLeft = marginPixels + "px";
  wrapper.style.marginTop = marginPixels + "px";
  wrapper.style.position = "fixed";
  wrapper.style.display = "inline-block";
  wrapper.style.overflow = "hidden";
  wrapper.style.clear = "both";
  wrapper.style.height = ""
  overlay.insertAdjacentElement("afterend", wrapper);
  console.log("Wrapper Added");
  addViewBox();
  addTextBox();
  addToolBar();
}

function addViewBox(){
  window.viewBox = document.createElement("viewBox");
  viewBox.id = "viewBox";
  var getting = browser.storage.local.get(["colour", "width", "height"]);
  getting.then(function(result){
    console.log("Colour Recieved");
    viewBox.style.backgroundColor = result.colour;
    viewBox.style.height = result.height + "px";
    viewBox.style.width = result.width + "px";
  }, function(){
    console.log("Colour not found");
    viewBox.style.backgroundColor = "white";
    viewBox.style.height = "255px";
    viewBox.style.width = "1000px";
  });
  viewBox.style.border = "2px solid grey";
  viewBox.style.marginBottom = "7px";
  viewBox.style.display = "inline-block";
  viewBox.style.top = "0";
  viewBox.style.float = "left";
  viewBox.style.overflow = "hidden";
  wrapper.appendChild(viewBox);
  console.log("ViewBox added");
}

function addTextBox(){
  window.textBox = document.createElement("div");
  textBox.id = "textBox";
  textBox.style.height = "100%";
  textBox.style.width = "100%";
  textBox.style.top = "5px";
  textBox.style.left = "5px";
  textBox.style.margin = "5px";
  var getting = browser.storage.local.get("fontSize");
  getting.then(function(result){
    textBox.style.fontSize = result.fontSize + "pt";
  }, function(){
    textBox.style.fontSize = "19pt";
  });
  textBox.style.overflowY = "scroll";
  textBox.style.overflowX = "hidden";

  viewBox.appendChild(textBox);
  console.log("Text Box added");
}

function addToolBar(){
  window.toolBar = document.createElement("div");
  toolBar.id = "toolBar";
  console.log(toolBar.id);
  var getting = browser.storage.local.get("width");
  getting.then(function(result){
    toolBar.style.width = result.width + "px";
  }, function(){
    toolBar.style.width = "1000px";
  });
  toolBar.style.height = "40px";
  toolBar.style.bottom = "0";
  toolBar.style.marginTop = "5px";
  toolBar.style.backgroundColor = "white";
  toolBar.style.border = "2px solid grey";
  toolBar.style.display = "inline-block";
  toolBar.style.float = "left";
  wrapper.appendChild(toolBar);
  //Add inside of toolbar
  addSearchBar();
  addSettingsButton();
  addSettingsSection();
}

function collectAllAppropriateElements(){
  var relevantElements = document.querySelectorAll("p,li,ol,h,h1,h2,h3,h4");
  console.log("Collecting Elements");
  console.log("Number of elements collected = " + relevantElements.length);
  var elementArrayCopy = [];
  for (var i = 0; i < relevantElements.length; i++){
    elementArrayCopy[i] = relevantElements[i].cloneNode(true);
    textBox.appendChild(elementArrayCopy[i]);
  }

  console.log("Added elements to textBox.");
}

function addSearchBar(){
  window.searchBar = document.createElement("div");
  searchBar.id = "searchBar";
  searchBar.style.margin = "4px";
  searchBar.style.float = "left";
  searchBar.style.display = "block";
  searchBar.style.borderRight = "2px solid grey";
  searchBar.innerHTML = "<input type='text' id='searchString'></input><button type='button' id='searchButton'>Search</button>";

  searchBar.innerHTML += "<button type='button' id='nextButton'>Next</button>";
  searchBar.innerHTML += "<button type='button' id='prevButton'>Previous</button>";
  searchBar.innerHTML += "<button type='button' id='clearSearchButton' style='display:none;'>Clear Search</button>";
  toolBar.appendChild(searchBar);
  window.searchButtonVar = document.getElementById("searchButton");
  searchButtonVar.style.marginRight = "5px";
  addSearchButtonFunctionality(searchButtonVar);
  addNextPrevButtonFunctionality();
  addClearSearchButton();
}

function addClearSearchButton(){
  window.clearSearchButton = document.getElementById("clearSearchButton");
  clearSearchButton.style.marginRight = "4px";
  clearSearchButton.onclick = function () {
    clearSearchButton.style.display = "none";
    searchButtonVar.style.display = "inline-block";
    console.log("Clearing");
    console.log(document.getElementsByClassName("searchSpans").length);
    while (document.getElementsByClassName("searchSpans").length > 0) {
      console.log(document.getElementsByClassName('searchSpans').length);
      document.getElementsByClassName('searchSpans')[0].className = "";
    }
    window.searchField.value = "";
    window.searchList = [];

  }

}



function addSearchButtonFunctionality(searchButtonVar){


  searchButtonVar.onclick = function (){

    window.searchField = document.getElementById("searchString");
    if (searchField.value != ""){
      console.log("Searching : " + searchField.value);
      var regSearch = new RegExp(searchField.value, "gi");
      textBox.innerHTML = textBox.innerHTML.replace(regSearch, function(match){
        return "<span class='searchSpans'>" + match + "</span>";
      });
      window.oldValue = searchField.value;
      var stringToRemove = "<span class='searchSpans'>" + oldValue + "</span>";
      var regRemove = new RegExp(stringToRemove, "gi");
      textBox.innerHTML = textBox.innerHTML.replace(regRemove, function(match){
        console.log(match);
        return oldValue;
      });
      window.searchList = document.getElementsByClassName("searchSpans");
      searchButtonVar.style.display = "none";
      clearSearchButton.style.display = "inline-block";
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }
  }
}

function addNextPrevButtonFunctionality(){
  console.log("nextButton added");
  window.nextButton = document.getElementById("nextButton");
  window.prevButton = document.getElementById("prevButton");
  prevButton.style.pointerEvents = "none";
  nextButton.style.pointerEvents = "none";
  prevButton.style.marginRight = "4px";
  var searchCounter = 1;
  nextButton.onclick = function (){
    console.log("next search");
    searchList[searchCounter].scrollIntoView();
    searchCounter ++;
  }

  prevButton.onclick = function(){
    console.log("previous search");
    searchCounter --;
    searchList[searchCounter - 1].scrollIntoView();

  }
}

function addSettingsButton(){
  window.settingsButtonDiv = document.createElement("div");
  settingsButtonDiv.id = "settingsButtonDiv";
  settingsButtonDiv.style.float = "left";
  settingsButtonDiv.style.marginTop = "4px";
  settingsButtonDiv.style.display = "block";
  settingsButtonDiv.style.marginLeft = "4px";
  settingsButtonDiv.innerHTML = "<button type='button' id='settingsButton'>Settings</button>";
  settingsButtonDiv.innerHTML += "<button type='button' id='removeStylesButton'>Remove Styles</button>";
  toolBar.appendChild(settingsButtonDiv);
  addRemoveStylesButtonFunctionality();
  var settingsButton = document.getElementById('settingsButton');
  settingsButton.onclick = function() {
    console.log("button clicked");
    searchBar.style.display = "none";
    settingsButtonDiv.style.display = "none";
    settingsSection.style.display = "block";
  }
}

function addRemoveStylesButtonFunctionality(){
  console.log("Remove Styles");
  var removeStylesButton = document.getElementById("removeStylesButton");
  removeStylesButton.style.float = "right";
  removeStylesButton.onclick = function(){
    iterateThroughChildren(textBox);
  }
}

function iterateThroughChildren(element){
  console.log("remove Style");
  element.className = "";
  if(element.hasChildNodes()){
    for (var i = 0; i < element.childNodes.length; i++) {
      iterateThroughChildren(element.childNodes[i]);
    }
  }
}

function addSettingsSection(){
  window.settingsSection = document.createElement("div");
  settingsSection.id = "settingsSection";
  settingsSection.style.float = "left";
  settingsSection.style.display = "none";
  toolBar.appendChild(settingsSection);
  addHeightWidthOptions();
  addFontSizeOptions();
  addColourOptions();
  addSaveButton();
}

function addHeightWidthOptions(){
  window.containerSizeOptionsDiv = document.createElement("div");
  containerSizeOptionsDiv.id = "containerSizeOptionsDiv";
  containerSizeOptionsDiv.style.float = "left";
  containerSizeOptionsDiv.style.display = "inline-block";
  containerSizeOptionsDiv.style.marginTop = "2px";
  containerSizeOptionsDiv.style.marginLeft   = "4px";
  containerSizeOptionsDiv.style.height = "35px";
  containerSizeOptionsDiv.style.lineHeight = "35px";
  containerSizeOptionsDiv.style.textAling = "center";
  containerSizeOptionsDiv.style.borderRight = "2px solid grey";
  containerSizeOptionsDiv.innerHTML = "<label>Height </label><button type='button' id='heightInc'>+</button><button type='button' id='heightDec'>-</button>";
  containerSizeOptionsDiv.innerHTML += "<label>Width </label><button type='button' id='widthInc'>+</button><button type='button' id='widthDec'>-</button>";
  settingsSection.appendChild(containerSizeOptionsDiv);

  addHeightFunctionality();
  addWidthFunctionality();

}

function addHeightFunctionality(){
  var heightIncButton = document.getElementById("heightInc");
  var heightDecButton = document.getElementById("heightDec");
  heightDecButton.style.marginRight = "4px";
  heightIncButton.onclick = function(){
    viewBox.style.height = (parseFloat(viewBox.style.height) + 5) + "px";
    wrapper.style.marginTop = (parseFloat(wrapper.style.marginTop) - 2.5) + "px";
  }

  heightDecButton.onclick = function(){
    viewBox.style.height = (parseFloat(viewBox.style.height) - 5) + "px";
    wrapper.style.marginTop = (parseFloat(wrapper.style.marginTop) + 2.5) + "px";
  }
}

function addWidthFunctionality(){
  var widthIncButton = document.getElementById("widthInc");
  var widthDecButton = document.getElementById("widthDec");
  widthDecButton.style.marginRight = "4px";
  widthIncButton.onclick = function(){
    viewBox.style.width = (parseFloat(viewBox.style.width) + 5) + "px";
    toolBar.style.width = (parseFloat(viewBox.style.width) + 5) + "px";
    wrapper.style.marginLeft = (parseFloat(wrapper.style.marginLeft) - 2.5) + "px";
  }

  widthDecButton.onclick = function(){
    viewBox.style.width = (parseFloat(viewBox.style.width) - 5) + "px";
    toolBar.style.width = (parseFloat(viewBox.style.width) - 5) + "px";
    wrapper.style.marginLeft = (parseFloat(wrapper.style.marginLeft) + 2.5) + "px";
  }
}

function addFontSizeOptions(){
  window.containerFontOptionsDiv = document.createElement("div");
  containerFontOptionsDiv.id = "containerFontOptionsDiv";
  containerFontOptionsDiv.style.float = "left";
  containerFontOptionsDiv.style.display = "block";
  containerFontOptionsDiv.style.margin = "4px";
  containerFontOptionsDiv.style.borderRight = "2px solid grey";
  containerFontOptionsDiv.innerHTML = "<label>Font </label><button type='button' id='fontInc'>+</button><button type='button' id='fontDec'>-</button>";
  settingsSection.appendChild(containerFontOptionsDiv);

  addFontButtonFunctionality();
}

function addFontButtonFunctionality(){
  var fontIncButton = document.getElementById("fontInc");
  var fontDecButton = document.getElementById("fontDec");
  fontDecButton.style.marginRight = "4px";

  fontDecButton.onclick = function(){
    console.log("font decreased");
    textBox.style.fontSize = (parseInt(textBox.style.fontSize) - 1) + "pt";
  }
  fontIncButton.onclick = function (){
    console.log("font increased");
    textBox.style.fontSize = (parseInt(textBox.style.fontSize) + 1) + "pt";
  }



}


function addColourOptions(){
  window.colourOptionsDiv = document.createElement("div");
  colourOptionsDiv.id = "colourOptionsDiv";
  colourOptionsDiv.style.display = "block";
  colourOptionsDiv.style.float = "left";
  colourOptionsDiv.style.margin = "4px";
  colourOptionsDiv.style.borderRight = "2px solid grey";
  colourOptionsDiv.innerHTML = "<button type=button class='colourButtons' id='whiteBut'>White</button>";
  colourOptionsDiv.innerHTML += "<button type=button class='colourButtons' id='yellowBut'>Yellow</button>";
  colourOptionsDiv.innerHTML += "<button type=button class='colourButtons' id='redBut'>Red</button>";
  colourOptionsDiv.innerHTML += "<button type=button class='colourButtons' id='blueBut'>Blue</button>";
  colourOptionsDiv.innerHTML += "<button type=button class='colourButtons' id='greenBut'>Green</button>";

  settingsSection.appendChild(colourOptionsDiv);

  addWhiteButtonFunctionality();
  addRedButtonFunctionality();
  addBlueButtonFunctionality();
  addYellowButtonFunctionality();
  addGreenButtonFunctionality();

}

function addWhiteButtonFunctionality(){
  var whiteBut = document.getElementById("whiteBut");

  whiteBut.onclick = function(){
    viewBox.style.backgroundColor = "white";
  }
}

function addRedButtonFunctionality(){
  var redBut = document.getElementById("redBut");

  redBut.onclick = function(){
    viewBox.style.backgroundColor = "red";
    textBox.style.fontColor = "white";
  }
}
function addBlueButtonFunctionality(){
  var blueBut = document.getElementById("blueBut");

  blueBut.onclick = function(){
    viewBox.style.backgroundColor = "blue";
    textBox.style.color = "white";
  }
}
function addYellowButtonFunctionality(){
  var yellowBut = document.getElementById("yellowBut");

  yellowBut.onclick = function(){
    viewBox.style.backgroundColor = "yellow";
    // textBox.style.fontColor = "white";
  }
}
function addGreenButtonFunctionality(){
  var greenBut = document.getElementById("greenBut");
  greenBut.style.marginRight = "4px";
  greenBut.onclick = function(){
    viewBox.style.backgroundColor = "green";
    textBox.style.fontColor = "white";
  }
}




function addSaveButton(){
  console.log("Adding Save Button");
  window.saveButtonDiv = document.createElement("div");
  saveButtonDiv.id = "saveButtonDiv";
  saveButtonDiv.style.float = "left";
  saveButtonDiv.style.display = "block";
  saveButtonDiv.style.margin = "4px";
  saveButtonDiv.innerHTML = "<button type='button' id='saveButton'>Save</button>";
  settingsSection.appendChild(saveButtonDiv);
   addSaveButtonFunctionality();
}

function addSaveButtonFunctionality(){
  var saveButton = document.getElementById("saveButton");
  saveButton.style.width = "60px";
  saveButton.style.padding = "0";
  saveButton.onclick = function () {
    settingsSection.style.display = "none";
    searchBar.style.display = "block";
    settingsButtonDiv.style.display = "block";
    var storingSettings = browser.storage.local.set({
      colour: viewBox.style.backgroundColor,
      width: parseFloat(viewBox.style.width),
      height: parseFloat(viewBox.style.height),
      fontSize: parseInt(textBox.style.fontSize)
    });
    storingSettings.then(function(){
      console.log("stored");
    }, function(){
      console.log("not stored");
    });
  }
}

function initialiseFunctionality(){
  console.log("Initialise");
  addOverlay();
  addWrapper();
  collectAllAppropriateElements();
  window.initialised = true;
  window.onOffBoolean = 1;
}

function addStyleSheet(){
  
  // insertingCSS.then(console.log(fulfilled);, console.log("error"););
  var styleS = document.createElement('style');
  styleS.type = 'text/css';
  styleS.innerHTML = '.searchSpans { background-color:yellow;}';
  document.getElementsByTagName('head')[0].appendChild(styleS);
}

function onOffView() {
  if (onOffBoolean == 1) {
    overlay.style.display = "none";
    wrapper.style.display = "none";
    onOffBoolean = 0;
  }else {
    overlay.style.display = "block";
    wrapper.style.display = "inline-block";
    onOffBoolean = 1;
  }
}

function onStartUp(){
  console.log("Starting Up");
  if (typeof initialised !== 'undefined'){
    onOffView();
  }else {
   addStyleSheet();
    initialiseFunctionality();

  }

}

onStartUp();
//finish search functionality
//removeStyling();
//addOwnStyling();
//finish settings functionality i.e change in storage
//getUserPreferencesFromLocalStorage();
//add button for top toolbar
//add option to choose by section
