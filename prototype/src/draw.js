/* 
    draw.js
    handles html canvas drawing 
*/
import { addGraffiti } from "./ar.js";

// DEBUG
let debug = document.getElementById('debug');

let canvas;
let ctx;

let rect;

let lastX;
let lastY;
let mouseX;
let mouseY;

let isDrawing = false;
let lineColor = "black";
let lineWidth = 30;

// controls
let drawingPanel;

const setupControls = () => {
    // get drawing panel
    drawingPanel = document.getElementById('drawing-panel');

    //drawing MOUSE EVENTS
    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;
    });
    canvas.addEventListener('mousemove', (e) => {
        lastX = mouseX;
        lastY = mouseY;
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    //drawing TOUCH EVENTS
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // prevent scrolling
        isDrawing = true;
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
        mouseX = lastX;
        mouseY = lastY;
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDrawing = false;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const touch = e.touches[0];
        lastX = mouseX;
        lastY = mouseY;
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
    });

    // save button
    document.getElementById('save-button').onclick = () => {
        try {
            const imgData = canvas.toDataURL("image/png");
            // add graffiti to scene
            addGraffiti(imgData);
            // hide drawing panel
            drawingPanel.style.display = 'none';
          } catch (error) {
            debug.innerHTML = error;
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }
    }

    // color buttons THESE DONT WORK YET
    document.getElementById('black').onclick = () => lineColor = "black";
    document.getElementById('orange').onclick = () => lineColor = "rgba(247, 105, 2)";
    document.getElementById('green').onclick = () => lineColor = "rgba(132, 189, 0)";
    document.getElementById('blue').onclick = () => lineColor = "rgba(0, 156, 189)";

    document.getElementById('clear').onclick = () => clearCanvas;

    // display drawing panel
    drawingPanel.style.display = 'block';
}

// Drawing helpers
const drawLine = (x1,y1,x2,y2) => {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

const drawCircle = (x,y) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.restore();
}

const drawLoop = () => {
    if (isDrawing) {
        drawCircle(mouseX,mouseY);
        drawLine(lastX,lastY,mouseX,mouseY);
    }

    setTimeout(drawLoop, 1);
}

const startDraw = () => {
    //clearCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLoop();
}

const clearCanvas = () => {
    // should delete or reset all drawing on canvas
}

const drawInit = () => {
    canvas = document.getElementById('whiteboard');
    ctx = canvas.getContext('2d');

    rect = canvas.getBoundingClientRect();

    let canvasOffsetX = canvas.offsetLeft;
    let canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;

    setupControls();
    startDraw();
}

export { drawInit };