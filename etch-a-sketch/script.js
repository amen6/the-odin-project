const container = document.getElementById('container');
const blackButton = document.getElementById('black');
const colorfulButton = document.getElementById('colorful');
let newSize = document.getElementById('newsize');
let displaySize = document.getElementById('sizelabel');
 
// it gives a random color
function randomColor(e){
    e.target.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
}

// it gives black color
function blackColor(e){
    e.target.style.background = 'black';
}
// it makes the boxes
function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.addEventListener('mouseover', randomColor);
      container.appendChild(cell).className = "grid-item";
    };
  };
 
// making boxes  
makeRows (10 ,10)

// identifying the size that user wants
$('.size').click(function(){
    var size = newSize.value;
    removeBoxes(container);
    makeRows(size, size);
})  

// cleaning everything when user click on reset button and making new boxes
$('.reset').click(function(){
    var boxes = document.querySelectorAll('.grid-item')
    boxes.forEach((box) => {
        box.style.background = '';
    })
})

// deleting every box
function removeBoxes (parent) {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

// it changes the number beside the range to same range value
newSize.value = 10;
displaySize.textContent = `${newSize.value} x ${newSize.value}`;
newSize.addEventListener('mousemove', function() {
  displaySize.textContent = `${newSize.value} x ${newSize.value}`;
})

// after clicking on button the hovering will makes boxes black
blackButton.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.grid-item');
    boxes.forEach((box) => {
        box.removeEventListener('mouseover', randomColor)
        box.addEventListener('mouseover', blackColor)
    })
})

// after clicking on button the hovering will makes boxes colorful(default)
colorfulButton.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.grid-item');
    boxes.forEach((box) => {
        box.removeEventListener('mouseover', blackColor)
        box.addEventListener('mouseover', randomColor)
    })
})