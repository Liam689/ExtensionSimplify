
browser.contextMenus.create({
  id: "simplify-menu",
  title: "Simplify this page"
});

browser.browserAction.onClicked.addListener(function(tab){
  console.log("Browser Button Clicked");
  browser.tabs.executeScript({
    file : "scripts/simplify2.js"
  });

});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "simplify-menu") {
    var insertingCSS = browser.tabs.insertCSS({file: "/scripts/mycss.css"});
    browser.tabs.executeScript({
      file : "scripts/simplify2.js"
    });
  }
});

// window.globalExample = "example of cr";
