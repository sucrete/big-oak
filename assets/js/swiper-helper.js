function getWidth() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  console.log("size of window: ", width);
  return width;
}
console.log(typeof getWidth());
window.addEventListener("load", onLoadFunction);
console.log("%c1", "color: red");
function onLoadFunction(e) {
  console.log("%c2", "color: yellow");

  window.addEventListener("resize", onResizeFunction);
  let size = getWidth();
  if (size > 768) return;
  console.log("inside onloadfunction");

  swipeHelper();
}

function onResizeFunction(e) {
  //do whatever you want to do on resize event
  console.log("inside onresizefunction");
  let size = getWidth();
  if (size > 768) return;
  swipeHelper();
}

const myTable = document.getElementsByClassName("table-one")[0];
const iconBox = document.getElementsByClassName("table-info")[0];

let call = 0;

var observer = new IntersectionObserver(
  function (entries) {
    // check to see if observer has been called before
    if (call == 0) {
      if (entries[0].isIntersecting === true) {
        console.log("Table has just APPEARED!");

        myTable.classList.toggle("de-emphasize");
        iconBox.classList.toggle("animate-in");
        setTimeout(() => {
          myTable.classList.toggle("de-emphasize");
          iconBox.classList.toggle("animate-out");
        }, 1500);
        call++;
      } else {
        console.log("Table has just DISAPPEARED!");
      }
    } else {
      return;
    }
  },
  { threshold: [0.25] }
);

const swipeHelper = () => {
  console.log("inside swipeHelper");
  console.log("%c3", "color: green");

  observer.observe(myTable);
};