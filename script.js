const DEFAULT_MODE = 'psychedelic'
const DEFAULT_SIZE = 16

let currentColor
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const button = document.querySelectorAll('button')
const drawingBox = document.getElementById("drawingBox")
const grid = document.getElementById('drawingBox')
const colorpicker = document.getElementById('colorpicker')
const size = document.getElementById('density')
const size_text = document.getElementById('size_text')
const grid_ele = document.getElementsByClassName('d-element')

createDiv(10)
button_events()
size.addEventListener('mouseup', pixelSize);

function pixelSize() {
    size_text.textContent ="PlayArea Size " + size.value
    let gridPixels = drawingBox.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createDiv(size.value);
}

function createDiv(width) {
    grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${width}, 1fr)`

    for(let x = 0;x < width*width; x++) {
        let div = document.createElement("div")
        div.classList.add("d-element")
        div.style.width = "100%"
        div.style.height = "100%"
        div.addEventListener("mouseover", () => drawingHover(div))
        drawingBox.appendChild(div)
    }
}


function button_events() {
    button.forEach((btn) => {
        btn.addEventListener('click', (event) => button_handler(event.target.id))
    })
}


function button_handler(id) {
    if (id === "color-selector") {
        currentMode = 'color-picker'
    }
    if (id === "black") {
        currentMode = 'black'
        currentColor = 'black'
    }
    if (id === "psychedelic") {
        currentMode = 'psychedelic'
    }
    if (id === "eraser") {
        currentMode = 'eraser'
        currentColor = 'white'
    }
    if (id === "clear") {
        currentMode = 'clear'
        currentColor = 'white'
        for (let ele in grid_ele) {
            grid_ele[ele].style.backgroundColor = 'white'
        }
    }
     if (id === "reset") {
        currentMode = DEFAULT_MODE
        currentSize = DEFAULT_SIZE
        size.value = currentSize
        pixelSize(currentSize)
    }
}


function drawingHover(div) {
    if (currentMode === 'black' || currentMode === 'eraser') {
        div.style.backgroundColor = currentColor
    } else if (currentMode === 'psychedelic') {
        currentColor = Math.floor(Math.random()*16777215).toString(16);
        div.style.backgroundColor = "#" + currentColor
    } else if (currentMode === 'color-picker') {
        currentColor = colorpicker.value
        div.style.backgroundColor = currentColor
    }
}
