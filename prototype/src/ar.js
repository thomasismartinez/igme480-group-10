// ar.js

import { drawInit } from "./draw.js";

// <a-assets> element which holds <img> elements as referances for <a-scene>
let assets;

// temp for while assets are purely stored in html
let imgIndex;

let startPos = [0,0,1.5] // x, y, z

// placement controls
let placement_controls;
let up_btn;
let down_btn;
let left_btn;
let right_btn;
let place_img_btn;

const arInit = () => {
    assets = document.querySelector('a-assets');

    // house click event
    AFRAME.registerComponent('clicker', {
        init: function() {
            this.el.addEventListener('click', e => {
                // open drawing panel
                drawInit();
            });
        }
    });

    // setup controls
    placement_controls = document.getElementById("placement-controls");
    placement_controls.style.display = 'none';

    up_btn = document.getElementById("up-btn");
    down_btn = document.getElementById("down-btn");
    left_btn = document.getElementById("left-btn");
    right_btn = document.getElementById("right-btn");

    place_img_btn = document.getElementById('place-img-btn');

    // this should also save img to database once that's implemented
    place_img_btn.onclick = () => placement_controls.style.display = 'none';

    imgIndex = 0;
}

// add graffiti to ar scene
const addGraffiti = (imgData) => {
    // create img element
    let img = document.createElement('img');
    img.src = imgData;
    img.id = `graffiti-img-${imgIndex}`;

    // add img to asset references
    assets.appendChild(img);
    
    // create ar image element
    let arImg = document.createElement('a-image');
    arImg.setAttribute('src', `#graffiti-img-${imgIndex}`);
    document.querySelector('a-marker').appendChild(arImg);

    activatePlacementControls(arImg);

    // iterate index
    imgIndex++;
}

const activatePlacementControls = (img) => {
    img.setAttribute('position', `${startPos[0]} ${startPos[1]} ${startPos[2]}`);
    let x = startPos[0];
    let y = startPos[1];
    let z = startPos[2];

    up_btn.onclick = () => img.setAttribute('position', `${x} ${y += 0.1} ${z}`);
    down_btn.onclick = () => img.setAttribute('position', `${x} ${y -= 0.1} ${z}`);
    right_btn.onclick = () => img.setAttribute('position', `${x += 0.1} ${y} ${z}`);
    left_btn.onclick = () => img.setAttribute('position', `${x -= 0.1} ${y} ${z}`);

    placement_controls.style.display = 'grid';
}

export { arInit, addGraffiti };