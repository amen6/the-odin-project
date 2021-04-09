const container = document.getElementById('container');

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.addEventListener('mouseover', function(){
          this.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
         });
      container.appendChild(cell).className = "grid-item";
    };
  };
makeRows (10 ,10)

$('.size').click(function(){
    var size = prompt('pick a number for boxes size');
    size = parseInt(size);
    if (size > 64 || size < 1  || Number.isNaN(size)){
        alert('please insert a number in range 1-64');
    } else {
        removeBoxes(container);
        makeRows(size, size);
    }
})  

$('.reset').click(function(){
    removeBoxes(container);
    makeRows(10, 10);
})
function removeBoxes (parent) {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

