  //Gotta restart// Should take about a week

  //Collect all paragraphs and headers
  //Create View Box
  //Create Container
  //Create Overlay
  //Insert all text into Overlay




  function addOverlay(){
    window.overlay = document.createElement("div");
    console.log("Overlay Added");
    overlay.id = "overlay";
    overlay.style.cssText = "backgroundColour:red;height :100%;width:100%;position:absolute;";
    // overlay.style.position = "absolute";
    // overlay.style.top = "0";
    // // overlay.style.bottom = "0";
    // // overlay.style.right = "0";
    // overlay.style.left = "0";
    // overlay.style.height = "100%";
    // overlay.style.width = "100%";
    // overlay.style.zIndex = "1";
    // overlay.style.display = "block";
    // overlay.style.backgroundColour = "grey";
    window.bodyTag = document.getElementsByTagName('body');
    bodyTag.appendChild(overlay);
    //bodyTag[0].insertBefore(overlay, bodyTag[0].firstChild);

  }

console.log("running");
addOverlay();
