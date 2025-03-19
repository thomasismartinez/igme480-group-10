import { arInit } from "./ar.js";

const init = () => {
    arInit();
    //setupControls();
}

const setupControls = () => { // possibly defunt, will probably gain new uses later
    document.getElementById('draw-begin-button').onclick = () => {
        drawInit();
        console.log('open drawing panel');
    }
}

init();