// for the animated tabs to work we need:
// - client width (width of tab pill or tab with padding)
// - left offset
// - click event handler for each tab

var tabs = document.getElementsByClassName("member-link");
var highlighter = document.getElementsByClassName("highlight")[0];

{
  (() => {
    const initialTab = tabs[0];
    highlighter.style.left = initialTab.offsetLeft + "px";
    highlighter.style.width = initialTab.offsetWidth + "px";
    highlighter.style.height = initialTab.offsetHeight + "px";
    // console.log("stuff is working", initialTab.offsetLeft);
  })();
}

function highlight(event) {
  highlighter.style.left = event.currentTarget.dataset.left + "px";
  highlighter.style.width = event.currentTarget.dataset.width + "px";
  // console.log("stuff is working inside function???", event.currentTarget.dataset.left);
};

for (var i = 0; i < tabs.length; i++) {
  tabs[i].dataset.width = tabs[i].offsetWidth;
  tabs[i].dataset.left = tabs[i].offsetLeft;
  // console.log(tabs[i].offsetLeft)
  tabs[i].addEventListener("click", (e) => {
    // e.preventDefault()
    highlight(e);
  });
  // console.log("working? *inside for-loop");
}
